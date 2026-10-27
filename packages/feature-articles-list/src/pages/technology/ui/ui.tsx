import { useTheme } from 'styled-components'

import { EPageStatus } from '@my-interview/common'
import { Breadcrumb, Flex } from '@my-interview/ui-kit'

import { TechnologyContent as Component } from '@articles-list/widgets/technology-content'

import { useResponse } from '../hooks'
import type { TechnologyViewProps } from '../types'
import { Error } from './Error'
import { Skeleton } from './Skeleton'
import { Styled } from './styled'

/**
 * Экран технологии.
 */
export const TechnologyView = ({ crumbs: crumbsCallback, onBack, slug }: TechnologyViewProps) => {
  const theme = useTheme()
  const { screen, pageStatus, reload, crumbs } = useResponse({ crumbs: crumbsCallback, slug })

  const ScreenComponent = (() => {
    switch (pageStatus) {
      case EPageStatus.LOADING:
        return <Skeleton />
      case EPageStatus.ERROR:
        return <Error onBack={onBack} onReload={reload} />
      case EPageStatus.SUCCESS:
        return (
          <Flex flexDirection="column" gap={theme.spacings.s12} style={{ minWidth: 0 }}>
            <Breadcrumb items={crumbs} />
            <Component {...screen} />
          </Flex>
        )
      default:
        return null
    }
  })()

  return <Styled.Layout>{ScreenComponent}</Styled.Layout>
}
