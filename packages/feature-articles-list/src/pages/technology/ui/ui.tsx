import { useEffect } from 'react'

import { EPageStatus, ErrorState, PageContainer } from '@my-interview/common'
import { Flex, theme } from '@my-interview/ui-kit'

import { TechnologyContent as Component } from '@articles-list/widgets/technology-content'

import { useResponse } from '../hooks'
import type { TechnologyViewProps } from '../types'
import { Skeleton } from './Skeleton'

/**
 * Экран технологии.
 *
 * @description
 * После загрузки прокручивает к строке из якоря адреса. Без якоря или без такой строки остаётся вверху.
 */
export const TechnologyView = ({ nav, onBack, slug }: TechnologyViewProps) => {
  const { screen, pageStatus, reload } = useResponse({ slug })

  useEffect(() => {
    if (pageStatus !== EPageStatus.SUCCESS) {
      return
    }

    const id = decodeURIComponent(window.location.hash.slice(1))
    const node = id ? document.getElementById(id) : null

    node?.scrollIntoView({ block: 'start' })
  }, [pageStatus, slug])

  const ScreenComponent = (() => {
    switch (pageStatus) {
      case EPageStatus.LOADING:
        return <Skeleton />
      case EPageStatus.ERROR:
        return <ErrorState onBack={onBack} onReload={reload} />
      case EPageStatus.SUCCESS:
        return (
          <Flex flexDirection="column" gap={theme.spacings.s12} style={{ minWidth: 0 }}>
            {nav?.(screen)}
            <Component {...screen} />
          </Flex>
        )
      default:
        return null
    }
  })()

  return <PageContainer>{ScreenComponent}</PageContainer>
}
