import { TraceMap, originalPositionFor } from '@jridgewell/trace-mapping'
import { transform, type Transform } from 'sucrase'

import type {
  CodePosition,
  ConsoleEntry,
  ConsoleLevel,
  RunInput,
  RunReport,
  RunTest,
  TaskCaseResult,
} from '@task/shared/model'

/**
 * Окружение воркера: что видят тесты и какие модули пускает `require`.
 */
interface Runtime {
  /**
   * Переменные теста помимо `solution` и `assert`: `render`, `screen`, `fireEvent`…
   */
  readonly globals: Readonly<Record<string, unknown>>

  /**
   * Модули для `import` в решении.
   */
  readonly modules: Readonly<Record<string, unknown>>

  /**
   * Уборка после теста: размонтировать деревья, очистить документ.
   */
  readonly reset?: () => void
}

interface Compiled {
  readonly code: string
  readonly map: TraceMap
}

type ModuleFactory = (exports: Record<string, unknown>, require: (name: string) => unknown, react: unknown) => void

type TestRun = (...args: unknown[]) => Promise<void>

const SOLUTION_FILE = 'solution.js'

const STACK_FRAME = /solution\.js:(\d+):(\d+)/

const format = (value: unknown): string => {
  try {
    const printed = JSON.stringify(value)

    return printed ?? 'undefined'
  } catch {
    return String(value)
  }
}

const CONSOLE_LEVELS = ['debug', 'error', 'info', 'log', 'warn'] as const

type ConsoleMethod = (...args: unknown[]) => void

const printArg = (value: unknown): string => {
  if (typeof value === 'string') {
    return value
  }

  if (value instanceof Error) {
    return value.stack ?? `${value.name}: ${value.message}`
  }

  return format(value)
}

/**
 * Перехватывает `console` на время теста и возвращает прежние методы.
 * Запись дублируется в настоящую консоль, чтобы её было видно и в DevTools воркера.
 */
const hookConsole = (push: (level: ConsoleLevel, text: string) => void) => {
  const target = globalThis.console as unknown as Record<ConsoleLevel, ConsoleMethod>
  const saved = Object.fromEntries(CONSOLE_LEVELS.map((level) => [level, target[level]])) as Record<
    ConsoleLevel,
    ConsoleMethod
  >

  CONSOLE_LEVELS.forEach((level) => {
    target[level] = (...args: unknown[]) => {
      push(level, args.map(printArg).join(' '))
      saved[level](...args)
    }
  })

  return () => {
    CONSOLE_LEVELS.forEach((level) => {
      target[level] = saved[level]
    })
  }
}

const deepEqual = (left: unknown, right: unknown): boolean => {
  if (Object.is(left, right)) {
    return true
  }

  if (typeof left !== 'object' || typeof right !== 'object' || left === null || right === null) {
    return false
  }

  if (Array.isArray(left) || Array.isArray(right)) {
    if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) {
      return false
    }

    return left.every((item, index) => deepEqual(item, right[index]))
  }

  const leftRecord = left as Record<string, unknown>
  const rightRecord = right as Record<string, unknown>
  const leftKeys = Object.keys(leftRecord)
  const rightKeys = Object.keys(rightRecord)

  if (leftKeys.length !== rightKeys.length) {
    return false
  }

  return leftKeys.every((key) => Object.hasOwn(rightRecord, key) && deepEqual(leftRecord[key], rightRecord[key]))
}

const createAssert = () => ({
  deepEqual: (actual: unknown, expected: unknown) => {
    if (!deepEqual(actual, expected)) {
      throw new Error(`Expected: ${format(expected)}\nReceived: ${format(actual)}`)
    }
  },
  equal: (actual: unknown, expected: unknown) => {
    if (!Object.is(actual, expected)) {
      throw new Error(`Expected: ${format(expected)}\nReceived: ${format(actual)}`)
    }
  },
  ok: (value: unknown, message?: string) => {
    if (!value) {
      throw new Error(message ?? `Expected truthy, received: ${format(value)}`)
    }
  },
})

const mismatch = (expected: string, received: string) => new Error(`Expected: ${expected}\nReceived: ${received}`)

const errorMessage = (error: unknown) => (error instanceof Error ? error.message : String(error))

const thrownBy = (fn: unknown): { error: unknown } | null => {
  if (typeof fn !== 'function') {
    throw new Error('toThrow ждёт функцию: expect(() => …).toThrow()')
  }

  try {
    ;(fn as () => unknown)()
  } catch (error) {
    return { error }
  }

  return null
}

const matchesThrow = (error: unknown, expected: string | RegExp | undefined) => {
  if (expected === undefined) {
    return true
  }

  const message = errorMessage(error)

  return typeof expected === 'string' ? message.includes(expected) : expected.test(message)
}

const contains = (actual: unknown, item: unknown) => {
  if (typeof actual === 'string') {
    return typeof item === 'string' && actual.includes(item)
  }

  return Array.isArray(actual) && actual.some((value) => deepEqual(value, item))
}

const createMatchers = (actual: unknown, negated: boolean) => {
  const check = (pass: boolean, expected: string, received = format(actual)) => {
    if (pass === negated) {
      throw mismatch(`${negated ? 'not ' : ''}${expected}`, received)
    }
  }

  return {
    toBe: (expected: unknown) => check(Object.is(actual, expected), format(expected)),
    toBeFalsy: () => check(!actual, 'falsy'),
    toBeTruthy: () => check(Boolean(actual), 'truthy'),
    toContain: (item: unknown) => check(contains(actual, item), `contains ${format(item)}`),
    toEqual: (expected: unknown) => check(deepEqual(actual, expected), format(expected)),
    toThrow: (expected?: string | RegExp) => {
      const thrown = thrownBy(actual)
      const label = expected instanceof RegExp ? String(expected) : format(expected)

      check(
        thrown !== null && matchesThrow(thrown.error, expected),
        expected === undefined ? 'throws' : `throws ${label}`,
        thrown ? `throws ${format(errorMessage(thrown.error))}` : 'no error'
      )
    },
  }
}

/**
 * Матчеры в духе jest поверх тех же сравнений, что у `assert`. Сообщения — в формате `assert`.
 */
const createExpect = () => (actual: unknown) => ({
  ...createMatchers(actual, false),
  not: createMatchers(actual, true),
})

interface SuiteCase {
  readonly fn: () => unknown
  readonly name: string
}

const isThenable = (value: unknown): value is PromiseLike<unknown> =>
  typeof value === 'object' && value !== null && typeof (value as { then?: unknown }).then === 'function'

/**
 * `describe` и `it` в теле теста: тело только регистрирует кейс, раннер выполняет его отдельно.
 * Один тест — один `it`: на этом держатся отметки в условии, счётчик скрытых и изоляция модуля.
 */
const createSuite = () => {
  const path: string[] = []
  const cases: SuiteCase[] = []
  let running = false

  const describe = (name: string, body: () => unknown) => {
    path.push(name)

    try {
      if (isThenable(body())) {
        throw new Error('Тело describe — синхронное: await пишите внутри it')
      }
    } finally {
      path.pop()
    }
  }

  const it = (name: string, fn: () => unknown) => {
    if (running) {
      throw new Error('it внутри it не поддерживается')
    }

    cases.push({ fn, name: [...path, name].join(' › ') })
  }

  const run = async (only?: string) => {
    const selected = cases.length > 1 ? cases.filter((item) => item.name === only) : cases

    if (cases.length > 1 && selected.length !== 1) {
      throw new Error('В одном тесте — один it')
    }

    const [current] = selected

    if (!current) {
      return
    }

    running = true

    try {
      await current.fn()
    } finally {
      running = false
    }
  }

  return { globals: { describe, it, test: it }, run }
}

const transformsOf = (language: string): Transform[] => {
  if (language === 'react') {
    return ['typescript', 'jsx']
  }

  return language === 'typescript' ? ['typescript'] : []
}

const compile = (code: string, transforms: Transform[], filePath: string) =>
  transform(code, {
    filePath,
    jsxFragmentPragma: 'React.Fragment',
    jsxPragma: 'React.createElement',
    production: true,
    sourceMapOptions: { compiledFilename: filePath },
    transforms,
  })

/**
 * Решение — модуль CommonJS: `export` превращается в `exports.X`, `import` — в `require`.
 * Sucrase сохраняет номера строк, а карта даёт точную колонку после JSX и TS.
 */
const compileSolution = (code: string, language: string): Compiled => {
  const result = compile(code, ['imports', ...transformsOf(language)], SOLUTION_FILE)
  const map = result.sourceMap ?? { file: SOLUTION_FILE, mappings: '', names: [], sources: [], version: 3 }

  return {
    code: `${result.code}\n//# sourceURL=${SOLUTION_FILE}`,
    map: new TraceMap({
      file: SOLUTION_FILE,
      mappings: map.mappings,
      names: map.names,
      sources: [SOLUTION_FILE],
      sourcesContent: [code],
      version: 3,
    }),
  }
}

/**
 * Тело теста внутри async-функции: в тесте можно `await`.
 */
const compileTest = (test: RunTest, language: string): string =>
  `return (async () => {\n${
    compile(test.code, transformsOf(language), `test-${test.id}.js`).code
  }\n})()\n//# sourceURL=test-${test.id}.js`

/**
 * Сколько строк движок добавляет перед телом `new Function`. В V8 — две.
 */
const wrapperLines = (() => {
  try {
    // Пробная функция только меряет обёртку движка.
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    new Function('throw new Error()\n//# sourceURL=solution.js')()
  } catch (error) {
    const match = error instanceof Error ? STACK_FRAME.exec(error.stack ?? '') : null

    if (match) {
      return Number(match[1]) - 1
    }
  }

  return 2
})()

/**
 * Позиция исключения в исходном решении по первому кадру `solution.js` в стеке.
 */
const runtimePosition = (error: unknown, map: TraceMap): CodePosition | undefined => {
  const match = error instanceof Error ? STACK_FRAME.exec(error.stack ?? '') : null

  if (!match) {
    return undefined
  }

  const line = Number(match[1]) - wrapperLines
  const column = Number(match[2]) - 1
  const original = originalPositionFor(map, { column, line })

  if (original.line === null || original.column === null) {
    return line > 0 ? { column: column + 1, line } : undefined
  }

  return { column: original.column + 1, line: original.line }
}

const syntaxPosition = (error: unknown): CodePosition | undefined => {
  const loc = typeof error === 'object' && error !== null && 'loc' in error ? error.loc : undefined

  if (typeof loc !== 'object' || loc === null || !('line' in loc) || !('column' in loc)) {
    return undefined
  }

  return typeof loc.line === 'number' && typeof loc.column === 'number'
    ? { column: loc.column, line: loc.line }
    : undefined
}

const messageOf = (error: unknown, fallback: string): string => {
  if (!(error instanceof Error)) {
    return fallback
  }

  return error.name && error.name !== 'Error' ? `${error.name}: ${error.message}` : error.message
}

const createModule = (compiled: Compiled, runtime: Runtime): (() => Record<string, unknown>) => {
  // Решение кандидата исполняется только внутри воркера.
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const factory = new Function('exports', 'require', 'React', compiled.code) as ModuleFactory

  const require = (name: string) => {
    if (!Object.hasOwn(runtime.modules, name)) {
      throw new Error(`Модуль «${name}» недоступен в песочнице`)
    }

    return runtime.modules[name]
  }

  return () => {
    const exports: Record<string, unknown> = {}

    factory(exports, require, runtime.modules.react)

    return exports
  }
}

const runCase = async (
  test: RunTest,
  language: string,
  instantiate: () => Record<string, unknown>,
  compiled: Compiled,
  runtime: Runtime
): Promise<{ readonly logs: readonly ConsoleEntry[]; readonly result: TaskCaseResult }> => {
  const hidden = test.hidden ?? false
  const logs: ConsoleEntry[] = []
  const restore = hookConsole((level, text) => {
    logs.push({ level, text, title: test.title })
  })

  try {
    const suite = createSuite()
    const scope: Record<string, unknown> = {
      ...runtime.globals,
      ...suite.globals,
      assert: createAssert(),
      expect: createExpect(),
      solution: instantiate(),
    }
    const scopeNames = Object.keys(scope)

    // Тест площадки исполняется только внутри воркера.
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const testRun = new Function(...scopeNames, compileTest(test, language)) as TestRun

    await testRun(...scopeNames.map((name) => scope[name]))
    await suite.run(test.title)

    return { logs, result: { hidden, id: test.id, passed: true, title: test.title } }
  } catch (error) {
    return {
      logs,
      result: {
        errorAt: hidden ? undefined : runtimePosition(error, compiled.map),
        hidden,
        id: test.id,
        message: hidden ? undefined : messageOf(error, 'тест завершился с ошибкой'),
        passed: false,
        title: test.title,
      },
    }
  } finally {
    restore()
    runtime.reset?.()
  }
}

interface Trace {
  cases: TaskCaseResult[]
  logs: readonly (readonly ConsoleEntry[])[]
}

const logKey = (entry: ConsoleEntry) => `${entry.level}\0${entry.text}`

/**
 * Логи терминала: весь вывод первого теста.
 * Из следующих — только строки, которых в предыдущих ещё не было столько же раз.
 */
const logsOf = (groups: readonly (readonly ConsoleEntry[])[]): ConsoleEntry[] => {
  const [first, ...rest] = groups

  if (!first) {
    return []
  }

  const merged = [...first]
  const seen = new Map<string, number>()

  first.forEach((entry) => {
    const key = logKey(entry)

    seen.set(key, (seen.get(key) ?? 0) + 1)
  })

  rest.forEach((group) => {
    const budget = new Map(seen)

    group.forEach((entry) => {
      const key = logKey(entry)
      const left = budget.get(key) ?? 0

      if (left > 0) {
        budget.set(key, left - 1)

        return
      }

      merged.push(entry)
      seen.set(key, (seen.get(key) ?? 0) + 1)
    })
  })

  return merged
}

const componentOf = (solution: Record<string, unknown>) =>
  Object.values(solution).find((value) => typeof value === 'function')

/**
 * «Запустить»: один модуль и его `console`. Тесты не исполняются.
 * React-компонент монтируется один раз, чтобы лог из тела функции попал в терминал.
 */
const capturePreview = (
  instantiate: () => Record<string, unknown>,
  language: string,
  compiled: Compiled,
  runtime: Runtime
): RunReport => {
  const logs: ConsoleEntry[] = []
  const restore = hookConsole((level, text) => {
    logs.push({ level, text })
  })

  try {
    const solution = instantiate()
    const { render } = runtime.globals
    const component = componentOf(solution)

    if (language === 'react' && typeof render === 'function' && typeof component === 'function') {
      render(component)
    }

    return { cases: [], logs }
  } catch (error) {
    const errorAt = runtimePosition(error, compiled.map)

    return {
      cases: [],
      error: messageOf(error, 'решение не запустилось'),
      errorAt,
      errorKind: errorAt ? 'runtime' : undefined,
      logs,
    }
  } finally {
    restore()
    runtime.reset?.()
  }
}

/**
 * Прогон решения: компиляция один раз, свежий модуль на каждый тест.
 */
const execute = async (input: RunInput, runtime: Runtime): Promise<RunReport> => {
  let compiled: Compiled

  try {
    compiled = compileSolution(input.code, input.language)
  } catch (error) {
    const errorAt = syntaxPosition(error)
    const message = (error instanceof Error ? error.message : 'решение не скомпилировалось')
      .replace(/^Error transforming [^:]+: /, '')
      .replace(/\s*\(\d+:\d+\)$/, '')

    return errorAt
      ? { cases: [], error: message, errorAt, errorKind: 'syntax', logs: [] }
      : { cases: [], error: message, logs: [] }
  }

  const instantiate = createModule(compiled, runtime)

  if (input.preview) {
    return capturePreview(instantiate, input.language, compiled, runtime)
  }

  try {
    instantiate()
  } catch (error) {
    const errorAt = runtimePosition(error, compiled.map)

    return {
      cases: [],
      error: messageOf(error, 'решение не запустилось'),
      errorAt,
      errorKind: errorAt ? 'runtime' : undefined,
      logs: [],
    }
  }

  // Тесты идут по очереди: у React-тестов общий документ.
  const traced = await input.tests.reduce<Promise<Trace>>(
    async (previous, test) => {
      const done = await previous
      const step = await runCase(test, input.language, instantiate, compiled, runtime)

      return { cases: [...done.cases, step.result], logs: [...done.logs, step.logs] }
    },
    Promise.resolve({ cases: [], logs: [] })
  )

  return { cases: traced.cases, logs: logsOf(traced.logs) }
}

export type { Runtime }
export { execute }
