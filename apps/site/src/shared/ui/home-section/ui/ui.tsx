import { useTheme } from 'styled-components'

import type { HomeSectionProps } from '../types'
import { Styled } from './styled'

/**
 * Секция главной: наезд на предыдущий блок, скругление сверху и гаттеры страницы.
 */
export const HomeSection = ({ children, fillViewport = false, gap, id, surface }: HomeSectionProps) => {
  const theme = useTheme()
  const wideTop = theme.spacings.s72 + theme.spacings.s64
  const mobileBottom = theme.spacings.s96 + theme.spacings.s64

  return (
    <Styled.Root
      relatively
      $fillViewport={fillViewport}
      $surface={surface}
      data-nav-surface={surface}
      data-snap-section=""
      desktopS={{ p: `${wideTop}px ${theme.layout.pageGutter}px ${theme.spacings.s96}px` }}
      flexDirection="column"
      forwardedAs="section"
      gap={gap}
      id={id}
      p={`${theme.spacings.s96}px ${theme.layout.pageGutterMobile}px ${mobileBottom}px`}
      tablet={{ p: `${wideTop}px ${theme.layout.pageGutterTablet}px ${theme.spacings.s96}px` }}
    >
      {children}
    </Styled.Root>
  )
}
