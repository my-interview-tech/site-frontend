import { EPageStatus, ErrorState, PageContainer, PageNavBar } from '@my-interview/common'

import { TechnologyContent as Component } from '@articles-list/widgets/technology-content'

import { useResponse } from '../hooks'
import type { TechnologyViewProps } from '../types'
import { Skeleton } from './Skeleton'

/**
 * Экран технологии.
 */
export const TechnologyView = ({ crumbs: crumbsCallback, onBack, slug }: TechnologyViewProps) => {
  const { screen, pageStatus, reload, crumbs } = useResponse({ crumbs: crumbsCallback, slug })

  const ScreenComponent = (() => {
    switch (pageStatus) {
      case EPageStatus.LOADING:
        return <Skeleton />
      case EPageStatus.ERROR:
        return <ErrorState onBack={onBack} onReload={reload} />
      case EPageStatus.SUCCESS:
        return (
          <PageNavBar crumbs={crumbs}>
            <Component {...screen} />
          </PageNavBar>
        )
      default:
        return null
    }
  })()

  return <PageContainer>{ScreenComponent}</PageContainer>
}
