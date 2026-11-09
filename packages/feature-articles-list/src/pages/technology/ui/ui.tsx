import { EPageStatus, ErrorState, PageContainer } from '@my-interview/common'
import { Flex, theme } from '@my-interview/ui-kit'

import { TechnologyContent as Component } from '@articles-list/widgets/technology-content'

import { useResponse } from '../hooks'
import type { TechnologyViewProps } from '../types'
import { Skeleton } from './Skeleton'

/**
 * Экран технологии.
 */
export const TechnologyView = ({ nav, onBack, slug }: TechnologyViewProps) => {
  const { screen, pageStatus, reload } = useResponse({ slug })

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
