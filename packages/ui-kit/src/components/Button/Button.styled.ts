import styled, { css } from 'styled-components'

import { breakpointsCss } from '../../lib/withBreakpoints'
import { glassOnHero, glassOnSurface, lensHover } from '../../theme/lens'
import { textStyle } from '../../theme/textStyle'
import { theme } from '../../theme/theme'
import { ButtonBase } from '../ButtonBase'
import type { ButtonLayout, ButtonShape, ButtonSize, ButtonVariant } from './Button.types'

const SIZE = {
  32: { font: 300, padding: theme.spacings.s12 },
  40: { font: 400, padding: theme.spacings.s16 },
  48: { font: 500, padding: theme.spacings.s20 },
  56: { font: 500, padding: theme.spacings.s24 },
} as const satisfies Record<ButtonSize, { font: number; padding: number }>

const hover = (rules: ReturnType<typeof css>) => css`
  @media (hover: hover) {
    &:hover:not(:disabled, [aria-disabled='true']) {
      ${rules}
    }
  }
`

const VARIANT = {
  primary: css`
    background: ${theme.colors.accent};
    color: ${theme.colors.white};

    ${hover(css`
      background: color-mix(in srgb, ${theme.colors.accent} 82%, white);
    `)}
  `,
  secondary: css`
    background: ${theme.colors.surface};
    border: 1px solid ${theme.colors.borderButton};
    color: ${theme.colors.inkSoft};

    ${hover(css`
      background: color-mix(in srgb, ${theme.colors.surface} 94%, ${theme.colors.ink});
      border-color: color-mix(in srgb, ${theme.colors.borderButton} 70%, ${theme.colors.ink});
    `)}
  `,
  glass: css`
    ${glassOnSurface}
    ${lensHover}
    color: ${theme.colors.textPrimary};

    ${hover(css`
      background: color-mix(in srgb, ${theme.colors.lensSurface} 92%, ${theme.colors.ink});
    `)}
  `,
  ghost: css`
    ${glassOnHero}
    ${lensHover}
    color: ${theme.colors.textOnHero};

    ${hover(css`
      background: color-mix(in srgb, ${theme.colors.lensHero} 88%, white);
    `)}
  `,
  inverse: css`
    background: ${theme.colors.white};
    color: ${theme.colors.textOnLight};

    ${hover(css`
      background: color-mix(in srgb, ${theme.colors.white} 90%, ${theme.colors.textOnLight});
    `)}
  `,
  text: css`
    ${textStyle(400)}
    background: transparent;
    color: ${theme.colors.textPrimary};

    ${hover(css`
      color: ${theme.colors.accent};
    `)}
  `,
} satisfies Record<ButtonVariant, ReturnType<typeof css>>

const SHAPE = {
  rect: css`
    border-radius: ${theme.radii.r10}px;
  `,
  round: css`
    border-radius: ${theme.radii.rPill}px;
  `,
} satisfies Record<ButtonShape, ReturnType<typeof css>>

const sizeCss = (size: ButtonSize | undefined, variant: ButtonVariant) => {
  if (!size || variant === 'text') {
    return null
  }

  return css`
    ${textStyle(SIZE[size].font, { weight: 'semibold' })}
    height: ${size}px;
    padding: 0 ${SIZE[size].padding}px;
  `
}

const selectedText = css`
  background: ${({ theme: appTheme }) => (appTheme.mode === 'dark' ? theme.colors.chip : theme.colors.accentBg)};
  color: ${({ theme: appTheme }) => (appTheme.mode === 'dark' ? theme.colors.textPrimary : theme.colors.accent)};
  font-weight: ${theme.fontWeights.semibold};
`

type RootProps = {
  $fullWidth: boolean
  $isSelected: boolean
  $layout: ButtonLayout
  $shape: ButtonShape
  $variant: ButtonVariant
}

const Root = styled(ButtonBase)<RootProps>`
  transition:
    background 200ms ease,
    border-color 200ms ease,
    color 200ms ease,
    transform 120ms ease;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  ${({ $variant }) => VARIANT[$variant]}
  ${({ $isSelected, $variant }) => $isSelected && $variant === 'text' && selectedText}
  ${({ $shape, $variant }) => $variant !== 'text' && SHAPE[$shape]}
  ${({ $layout, $variant }) => sizeCss($layout.size, $variant)}
  ${({ $layout, $variant }) => breakpointsCss($layout, ({ size }) => sizeCss(size, $variant))}

  @media (prefers-reduced-motion: no-preference) {
    &:active:not(:disabled, [aria-disabled='true']) {
      transform: scale(0.98);
    }
  }
`

const Label = styled.span`
  position: relative;
  z-index: 1;
`

export const Styled = {
  Label,
  Root,
}
