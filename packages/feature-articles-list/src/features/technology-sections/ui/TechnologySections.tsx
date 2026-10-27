import { Fragment } from 'react'
import { useTheme } from 'styled-components'

import { TechnologyItemRow } from '@articles-list/entities/technology-item'

import { UpgradeBanner } from '@articles-list/entities/upgrade-banner'

import type { TechnologySectionsProps } from '../types'
import { Styled } from './styled'

/**
 * Секции материалов технологии.
 *
 * @description
 * - Закрытый материал идёт без ссылки.
 * - Баннер подписки встаёт после материала `upgrade.afterItemId`.
 */
export const TechnologySections = ({ sections }: TechnologySectionsProps) => {
  const theme = useTheme()

  return (
    <>
      {sections.map(({ anchor, id, items, title, upgrade }) => (
        <Styled.Section flexDirection="column" forwardedAs="section" gap={theme.spacings.s12} id={anchor} key={id}>
          <Styled.Title>{title}</Styled.Title>

          <Styled.Panel flexDirection="column">
            {items.map((item) => (
              <Fragment key={item.id}>
                <TechnologyItemRow href={item.isAvailable ? item.href : undefined} item={item} />
                {upgrade?.afterItemId === item.id && <UpgradeBanner {...upgrade} />}
              </Fragment>
            ))}
          </Styled.Panel>
        </Styled.Section>
      ))}
    </>
  )
}
