import { useTheme } from 'styled-components'

import { LockIcon, Text } from '@my-interview/ui-kit'
import type { TechnologyUpgrade as UpgradeBannerProps } from '@articles-list/shared/model'

import { CHECKOUT_HREF } from './constants'
import { Styled } from './styled'

export type { UpgradeBannerProps }

/**
 * Баннер подписки между строками секции.
 *
 * @description
 * - `locally` ведёт на страницу оплаты пакета, `browser` — на `action.link`.
 * - `browser` без `link` идёт без кнопки.
 */
export const UpgradeBanner = ({ action, cta, description, title }: UpgradeBannerProps) => {
  const theme = useTheme()
  const href = action.type === 'locally' ? CHECKOUT_HREF : action.link

  return (
    <Styled.Banner
      alignItems="flex-start"
      flexWrap="wrap"
      forwardedAs="aside"
      gap={theme.spacings.s12}
      p={theme.spacings.s16}
      tablet={{ alignItems: 'center', flexWrap: 'nowrap' }}
    >
      <Styled.BannerIcon inline alignItems="center" flexShrink={0} justifyContent="center" width={40}>
        <LockIcon />
      </Styled.BannerIcon>

      <Styled.BannerCopy flex={1} flexDirection="column" gap={theme.spacings.s4}>
        <Text as="p" color={theme.colors.textPrimary} font="title">
          {title}
        </Text>
        <Text as="p" color={theme.colors.textSecondary} font="body">
          {description}
        </Text>
      </Styled.BannerCopy>

      {href && (
        <Styled.BannerCta
          inline
          alignItems="center"
          flexShrink={0}
          forwardedAs="a"
          href={href}
          justifyContent="center"
          tablet={{ width: 'auto' }}
          width="100%"
        >
          {cta}
        </Styled.BannerCta>
      )}
    </Styled.Banner>
  )
}
