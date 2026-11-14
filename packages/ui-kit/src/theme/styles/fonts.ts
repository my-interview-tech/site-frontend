import { createGlobalStyle, css } from 'styled-components'

import { STATIC_URL } from '../../constants'
import { fontWeights } from '../typography'
import type { FontWeight } from '../typography'

const FONT_URL = `${STATIC_URL}/fonts`

const INTER_FILES = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semibold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
} as const satisfies Record<FontWeight, string>

const interFace = (weight: FontWeight): ReturnType<typeof css> => {
  const file = INTER_FILES[weight]
  const url = `${FONT_URL}/${file}/${file}`

  return css`
    @font-face {
      font-display: swap;
      font-family: Inter;
      font-style: normal;
      font-weight: ${fontWeights[weight]};
      src: url('${url}.eot');
      src:
        url('${url}.eot?#iefix') format('embedded-opentype'),
        url('${url}.woff2') format('woff2'),
        url('${url}.woff') format('woff'),
        url('${url}.ttf') format('truetype'),
        url('${url}.svg#${file}') format('svg');
    }
  `
}

/** Inter в начертаниях шкалы и базовый стек шрифта. */
export const Fonts = createGlobalStyle`
  ${interFace('regular')}
  ${interFace('medium')}
  ${interFace('semibold')}
  ${interFace('bold')}

  body {
    font-family: Inter, system-ui, sans-serif;
    font-synthesis: none;
    text-rendering: optimizelegibility;
  }
`
