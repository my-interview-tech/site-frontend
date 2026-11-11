/**
 * Адрес секции.
 */
export const sectionHref = (pathname: string, sectionId: string): string =>
  pathname === '/' ? `#${sectionId}` : `/#${sectionId}`
