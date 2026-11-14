import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router'

import type { PageFrameProps } from '../types'
import { Styled } from './styled'

/**
 * Оболочка экрана каталога: фон, отступы и прокрутка наверх при смене адреса.
 */
export const PageFrame = ({ children }: PageFrameProps) => {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <Styled.Container data-footer-snap="" data-nav-surface="page">
      {children}
    </Styled.Container>
  )
}
