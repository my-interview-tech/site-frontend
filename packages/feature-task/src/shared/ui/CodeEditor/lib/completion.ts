import {
  autocompletion,
  completeFromList,
  ifNotIn,
  snippetCompletion,
  type Completion,
  type CompletionSource,
} from '@codemirror/autocomplete'
import { javascriptLanguage, scopeCompletionSource } from '@codemirror/lang-javascript'
import { Prec, type Extension } from '@codemirror/state'
import React from 'react'

import { REACT_GLOBALS, SANDBOX_GLOBALS } from '@task/shared/lib'

const NOT_IN = ['BlockComment', 'LineComment', 'String', 'TemplateString']

const HOOK = 'хук React'

const HOOK_SNIPPETS: readonly Completion[] = [
  snippetCompletion('const [#{value}, #{setValue}] = useState(#{})', {
    detail: HOOK,
    label: 'useState',
    type: 'function',
  }),
  snippetCompletion('useEffect(() => {\n\t#{}\n}, [#{}])', { detail: HOOK, label: 'useEffect', type: 'function' }),
  snippetCompletion('const #{value} = useMemo(() => #{}, [#{}])', { detail: HOOK, label: 'useMemo', type: 'function' }),
  snippetCompletion('const #{handler} = useCallback((#{}) => {\n\t#{}\n}, [#{}])', {
    detail: HOOK,
    label: 'useCallback',
    type: 'function',
  }),
  snippetCompletion('const #{ref} = useRef(#{null})', { detail: HOOK, label: 'useRef', type: 'function' }),
  snippetCompletion('const [#{state}, #{dispatch}] = useReducer(#{reducer}, #{})', {
    detail: HOOK,
    label: 'useReducer',
    type: 'function',
  }),
]

const scopeOf = (language: string): Record<string, unknown> => {
  const host = globalThis as unknown as Record<string, unknown>
  const scope: Record<string, unknown> = Object.fromEntries(SANDBOX_GLOBALS.map((name) => [name, host[name]]))

  if (language === 'react') {
    REACT_GLOBALS.forEach((name) => {
      scope[name] = React
    })
  }

  return scope
}

const sourcesOf = (language: string, completions: readonly Completion[]): CompletionSource[] => {
  const sources: CompletionSource[] = [scopeCompletionSource(scopeOf(language))]

  if (language === 'react') {
    sources.push(ifNotIn(NOT_IN, completeFromList([...HOOK_SNIPPETS])))
  }

  if (completions.length > 0) {
    sources.push(ifNotIn(NOT_IN, completeFromList([...completions])))
  }

  return sources
}

/**
 * Автодополнение поверх встроенного в `javascript()`: глобалы песочницы, хуки React и имена из условия.
 */
export const completionExtension = (language: string, completions: readonly Completion[] = []): Extension => [
  Prec.high(autocompletion({ activateOnTyping: true, icons: true, maxRenderedOptions: 30 })),
  sourcesOf(language, completions).map((autocomplete) => javascriptLanguage.data.of({ autocomplete })),
]
