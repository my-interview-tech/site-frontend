import { forwardRef } from 'react'

import { Styled } from './Flex.styled'
import type { FlexProps } from './Flex.types'

/**
 * Flex-контейнер, mobile first.
 * Стили без брейкпоинта действуют с 0px, пока их не перекроет `tablet`, `desktopXS` и шире.
 */
export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      alignContent,
      alignItems,
      alignSelf,
      columnGap,
      desktopL,
      desktopM,
      desktopS,
      desktopXL,
      desktopXS,
      fillHeight,
      fillWidth,
      flex,
      flexBasis,
      flexDirection,
      flexGrow,
      flexShrink,
      flexWrap,
      gap,
      inline,
      justifyContent,
      justifyItems,
      justifySelf,
      order,
      p,
      relatively,
      rowGap,
      tablet,
      width,
      ...rest
    },
    ref
  ) => (
    <Styled.Component
      {...rest}
      ref={ref}
      $layout={{
        alignContent,
        alignItems,
        alignSelf,
        columnGap,
        desktopL,
        desktopM,
        desktopS,
        desktopXL,
        desktopXS,
        fillHeight,
        fillWidth,
        flex,
        flexBasis,
        flexDirection,
        flexGrow,
        flexShrink,
        flexWrap,
        gap,
        inline,
        justifyContent,
        justifyItems,
        justifySelf,
        order,
        p,
        relatively,
        rowGap,
        tablet,
        width,
      }}
    />
  )
)

Flex.displayName = 'Flex'
