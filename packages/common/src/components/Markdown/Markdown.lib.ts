/** Язык из класса `language-*`, который react-markdown ставит на ограду. */
export const fenceLanguage = (className?: string): string => /language-(\S+)/.exec(className ?? '')?.[1] ?? ''

/**
 * Название файла или комментарий после языка в инфо-строке ограды.
 *
 * @description `mdast-util-to-hast` кладёт хвост инфо-строки в `data.meta` элемента `code`. Форма `title="App.tsx"` отдаёт значение без кавычек.
 */
export const fenceMeta = (data: unknown): string => {
  if (typeof data !== 'object' || data === null || !('meta' in data) || typeof data.meta !== 'string') {
    return ''
  }

  const meta = data.meta.trim()

  return /^title=(["'])(.*)\1$/.exec(meta)?.[2] ?? meta
}
