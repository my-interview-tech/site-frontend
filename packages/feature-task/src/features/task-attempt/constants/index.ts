export const TEXT = {
  CLEAR: 'Очистить',
  COPY: 'Копировать',
  CRASH: 'Раннер завершился с ошибкой',
  EDITOR: 'Решение',
  RESET: 'Сбросить',
  RESULT: 'Terminal',
  RUN: 'Запустить',
  RUNTIME_ERROR: 'Ошибка выполнения',
  SOLUTIONS: 'Перейти к решениям',
  SUBMIT: 'Сдать',
  SYNTAX_ERROR: 'Синтаксическая ошибка',
} as const

/**
 * Горячие клавиши прогона: значение `aria-keyshortcuts` на кнопках.
 */
export const LANGUAGE_ICON: Record<string, string> = {
  javascript: 'icon-javascript',
  react: 'icon-react',
  typescript: 'icon-typescript',
}

export const SHORTCUTS = {
  sample: 'Meta+Enter Control+Enter',
  submit: 'Meta+Shift+Enter Control+Shift+Enter',
} as const
