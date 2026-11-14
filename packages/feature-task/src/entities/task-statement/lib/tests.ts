import type { StatementTest, SuiteState, TestDiff, TestGroup } from '../types'

const PATH_SEPARATOR = ' › '

/**
 * Состояние строки теста по прогону и его результату.
 */
export const getSuiteState = (running: boolean, passed: boolean | undefined): SuiteState => {
  if (running) {
    return 'running'
  }

  if (passed === undefined) {
    return 'idle'
  }

  return passed ? 'passed' : 'failed'
}

/**
 * Путь `describe › it` по частям.
 */
export const splitTestPath = (title: string): string[] => title.split(PATH_SEPARATOR)

/**
 * Expected и Received из сообщения раннера. Без меток всё сообщение уходит в Received.
 */
export const parseTestDiff = (message: string | undefined): TestDiff => {
  if (!message) {
    return { expected: '', received: '' }
  }

  const expected = message.match(/^Expected: (.*)$/m)?.[1]
  const received = message.match(/^Received: (.*)$/m)?.[1]

  if (expected !== undefined || received !== undefined) {
    return { expected: expected ?? '', received: received ?? '' }
  }

  return { expected: '', received: message }
}

/**
 * Общий `describe` группы, если он один у всех тестов и у каждого есть вложенный уровень.
 */
export const getSharedHead = (items: readonly StatementTest[]): string | undefined => {
  const heads = items.map((test) => splitTestPath(test.title)[0])
  const [head] = heads

  return head && items.every((test) => splitTestPath(test.title).length > 1) && heads.every((item) => item === head)
    ? head
    : undefined
}

/**
 * Склеивает подряд идущие тесты с одинаковым кодом в одну группу.
 */
export const groupTestsByCode = (tests: readonly StatementTest[]): TestGroup[] => {
  const groups: TestGroup[] = []

  tests.forEach((test) => {
    const last = groups.at(-1)

    if (last && last.code === test.code) {
      last.items.push(test)

      return
    }

    groups.push({ code: test.code, items: [test] })
  })

  return groups
}
