import { ANCHOR_PREFIX } from '../constants'

/**
 * Id якоря шага на странице.
 */
export const anchorOf = (slug: string): string => `${ANCHOR_PREFIX}${slug}`
