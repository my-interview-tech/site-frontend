import type { PointerEvent } from 'react'

import { css } from 'styled-components'

import { theme } from './theme'

const placeLens = (event: PointerEvent<HTMLElement>) => {
  const rect = event.currentTarget.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100

  event.currentTarget.style.setProperty('--lens', `${x}% ${y}%`)
}

const glassOnHero = css`
  backdrop-filter: blur(18px) saturate(1.7);
  background: ${theme.colors.lensHero};
`

const glassOnSurface = css`
  backdrop-filter: blur(22px) saturate(1.5);
  background: ${theme.colors.lensSurface};
  box-shadow: inset 0 0 0 1px ${theme.colors.lensInset};
`

const lensHover = css`
  --lens: 50% 32%;

  border: 0;
  overflow: hidden;
  position: relative;

  @media (hover: hover) and (min-width: ${theme.breakpoints.tablet + 1}px) {
    &:hover:not(:disabled, [aria-disabled='true'])::before {
      opacity: 1;
    }
  }

  &::before {
    background: radial-gradient(28px 28px at var(--lens), ${theme.colors.lensGlow});
    border-radius: inherit;
    content: '';
    inset: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    transition: opacity 180ms ease;
  }
`

export { glassOnHero, glassOnSurface, lensHover, placeLens }
