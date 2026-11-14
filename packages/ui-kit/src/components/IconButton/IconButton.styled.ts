import styled, { css } from 'styled-components'

import { glassOnHero, glassOnSurface, lensHover } from '../../theme/lens'
import { theme } from '../../theme/theme'
import { ButtonBase } from '../ButtonBase'
import { Icon } from '../Icon'
import type { IconButtonSize, IconButtonVariant } from './IconButton.types'

const active = (rules: ReturnType<typeof css>) => css`
  &[aria-expanded='true'] {
    ${rules}
  }

  @media (hover: hover) {
    &:hover:not(:disabled, [aria-disabled='true']) {
      ${rules}
    }
  }
`

const VARIANT = {
  secondary: css`
    background: ${theme.colors.surface};
    border: 1px solid ${theme.colors.border};
    color: ${theme.colors.textPrimary};

    ${active(css`
      background: color-mix(in srgb, ${theme.colors.surface} 94%, ${theme.colors.ink});
      border-color: color-mix(in srgb, ${theme.colors.border} 70%, ${theme.colors.ink});
    `)}
  `,
  glass: css`
    ${glassOnSurface}
    ${lensHover}
    color: ${theme.colors.textPrimary};

    ${active(css`
      background: color-mix(in srgb, ${theme.colors.lensSurface} 92%, ${theme.colors.ink});
    `)}
  `,
  ghost: css`
    ${glassOnHero}
    ${lensHover}
    color: ${theme.colors.textOnHero};

    ${active(css`
      background: color-mix(in srgb, ${theme.colors.lensHero} 88%, white);
    `)}
  `,
  text: css`
    background: transparent;
    color: ${theme.colors.textPrimary};

    ${active(css`
      color: ${theme.colors.accent};
    `)}
  `,
} satisfies Record<IconButtonVariant, ReturnType<typeof css>>

const Root = styled(ButtonBase)<{ $size: IconButtonSize; $variant: IconButtonVariant }>`
  border-radius: ${theme.radii.rPill}px;
  flex-shrink: 0;
  height: ${({ $size }) => $size}px;
  transition:
    background 200ms ease,
    border-color 200ms ease;
  width: ${({ $size }) => $size}px;
  ${({ $variant }) => VARIANT[$variant]}
`

const Glyph = styled(Icon)`
  position: relative;
  z-index: 1;
`

export const Styled = {
  Glyph,
  Root,
}
