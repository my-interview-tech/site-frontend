import type { TypographyStep } from '@my-interview/ui-kit'

/**
 * Кегль заголовка Markdown по уровню.
 */
export const HEADING_FONT = {
  h1: 800,
  h2: 700,
  h3: 600,
  h4: 500,
  h5: 500,
  h6: 400,
} as const satisfies Record<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', TypographyStep>
