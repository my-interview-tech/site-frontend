import { tsxLanguage } from '@codemirror/lang-javascript'

type Node = ReturnType<typeof tsxLanguage.parser.parse>['topNode']

const SEPARATOR = ' › '

const CASES = new Set(['it', 'test'])

const unquote = (raw: string) => raw.slice(1, -1).replace(/\\(.)/g, '$1')

/**
 * Строка без подстановок: `'…'`, `"…"` или шаблон без `${}`. Иначе название не вычислить без запуска.
 */
const literalOf = (node: Node | null, code: string): string | undefined => {
  if (node?.name === 'String') {
    return unquote(code.slice(node.from, node.to))
  }

  if (node?.name === 'TemplateString' && !node.getChild('Interpolation')) {
    return unquote(code.slice(node.from, node.to))
  }

  return undefined
}

const callOf = (node: Node, code: string) => {
  const callee = node.firstChild
  const args = node.getChild('ArgList')

  if (callee?.name !== 'VariableName' || !args) {
    return undefined
  }

  // Первый ребёнок ArgList — скобка, за ней первый аргумент.
  const label = literalOf(args.firstChild?.nextSibling ?? null, code)

  return label === undefined ? undefined : { args, label, name: code.slice(callee.from, callee.to) }
}

const collect = (node: Node, path: readonly string[], code: string, found: string[]) => {
  const call = node.name === 'CallExpression' ? callOf(node, code) : undefined

  if (call && CASES.has(call.name)) {
    found.push([...path, call.label].join(SEPARATOR))

    return
  }

  const nextPath = call?.name === 'describe' ? [...path, call.label] : path
  const child = call?.name === 'describe' ? call.args.firstChild : node.firstChild

  walk(child, nextPath, code, found)
}

const walk = (node: Node | null, path: readonly string[], code: string, found: string[]) => {
  if (!node) {
    return
  }

  collect(node, path, code, found)
  walk(node.nextSibling, path, code, found)
}

/**
 * Пути всех `it` и `test`: `describe › describe › it`.
 */
export const titlesOf = (code: string): readonly string[] => {
  const found: string[] = []

  collect(tsxLanguage.parser.parse(code).topNode, [], code, found)

  return found
}

/**
 * Название кейса из кода теста: путь `describe › it` первого `it` или `test`.
 * @example `describe('Counter', () => { it('считает клики', …) })` → `Counter › считает клики`
 */
export const titleOf = (code: string): string | undefined => titlesOf(code)[0]
