export const TEXT = {
  copied: 'Скопировано',
  copy: 'Скопировать',
} as const

/**
 * Сколько миллисекунд кнопка показывает «Скопировано».
 */
export const COPIED_TIMEOUT = 2000

/**
 * Синонимы языка из базы знаний. Ключ в нижнем регистре.
 * Пустая строка — языка нет.
 */
export const LANGUAGE_ALIAS: Record<string, string> = {
  copy: '',
  javascript: 'js',
  node: 'js',
  'node.js': 'js',
  plaintext: '',
  sh: 'bash',
  shell: 'bash',
  text: '',
  typescript: 'ts',
  zsh: 'bash',
}
