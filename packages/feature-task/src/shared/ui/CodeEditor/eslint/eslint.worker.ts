import { Linter } from 'eslint-linter-browserify'
import reactHooks from 'eslint-plugin-react-hooks'

import { REACT_GLOBALS, SANDBOX_GLOBALS } from '@task/shared/lib'

import type { LintMessage, LintRequest, LintResponse } from './eslint.protocol'

interface VerifyMessage extends LintMessage {
  readonly fatal?: boolean
}

interface FlatLinter {
  verify: (code: string, config: readonly object[], filename: string) => readonly VerifyMessage[]
}

const linter = new (Linter as new (options: { configType: 'flat' }) => FlatLinter)({ configType: 'flat' })

const readonlyGlobals = (names: readonly string[]) => Object.fromEntries(names.map((name) => [name, 'readonly']))

const RULES = {
  eqeqeq: ['warn', 'smart'],
  'no-const-assign': 'error',
  'no-constant-condition': 'warn',
  'no-dupe-keys': 'error',
  'no-self-assign': 'error',
  'no-undef': 'error',
  'no-unreachable': 'error',
  'no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],
  'prefer-const': 'warn',
  'use-isnan': 'error',
  'valid-typeof': 'error',
} as const

const REACT_RULES = {
  'react-hooks/exhaustive-deps': 'warn',
  'react-hooks/rules-of-hooks': 'error',
} as const

const configOf = (language: string): object[] => {
  const isReact = language === 'react'

  return [
    {
      files: ['**/*'],
      languageOptions: {
        ecmaVersion: 'latest',
        globals: readonlyGlobals(isReact ? [...SANDBOX_GLOBALS, ...REACT_GLOBALS] : SANDBOX_GLOBALS),
        parserOptions: { ecmaFeatures: { jsx: isReact } },
        sourceType: 'module',
      },
      plugins: isReact ? { 'react-hooks': reactHooks } : {},
      rules: isReact ? { ...RULES, ...REACT_RULES } : RULES,
    },
  ]
}

interface WorkerScope {
  onmessage: ((event: MessageEvent<LintRequest>) => void) | null
  postMessage: (message: LintResponse) => void
}

const scope = globalThis as unknown as WorkerScope

scope.onmessage = ({ data }) => {
  let messages: readonly VerifyMessage[] = []

  try {
    messages = linter.verify(data.code, configOf(data.language), 'solution.js')
  } catch {
    messages = []
  }

  scope.postMessage({
    id: data.id,
    messages: messages
      .filter((message) => !message.fatal)
      .map(({ column, endColumn, endLine, fix, line, message, ruleId, severity }) => ({
        column,
        endColumn,
        endLine,
        fix,
        line,
        message,
        ruleId,
        severity,
      })),
  })
}
