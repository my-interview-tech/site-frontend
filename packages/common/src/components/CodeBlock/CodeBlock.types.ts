export type CodeBlockProps = {
  /**
   * Название файла в инфо-строке.
   */
  title?: string

  /**
   * Язык из инфо-строки ограды.
   * Регистр и синонимы (`javascript`, `node.js`) не важны.
   * Без языка код не подсвечивается.
   */
  lang?: string

  /**
   * Текст кода.
   */
  children: string
}
