export type InfoLine = {
  HREF?: string
  /** Адрес SVG рядом с текстом. */
  ICON?: string
  TEXT?: string
}

export type InfoImage = {
  ALT?: string
  SRC?: string
}

export type InfoBlock = {
  IMAGE?: InfoImage
  LINES?: readonly InfoLine[]
  TITLE?: string
}

export type InfoPageContract = {
  BLOCKS?: readonly InfoBlock[]
  DESCRIPTION?: string
  TITLE?: string
}

export type InfoPageProps = InfoPageContract
