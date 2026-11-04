import { useTheme } from 'styled-components'

import { Button, Flex, Logo, SocialButton, Text } from '@my-interview/ui-kit'

import { asset, externalLinks } from '@shared/constants'

import { SOCIALS, TEXT } from './config'
import { Styled } from './styled'

export const Footer = () => {
  const theme = useTheme()

  return (
    <Styled.Container
      alignItems="flex-start"
      data-nav-surface="canvas"
      flexDirection="column"
      forwardedAs="footer"
      desktopS={{ p: `${theme.spacings.s24}px ${theme.layout.pageGutter}px` }}
      gap={theme.spacings.s16}
      p={`${theme.spacings.s20}px ${theme.layout.pageGutterMobile}px`}
      tablet={{
        alignItems: 'flex-end',
        flexDirection: 'row',
        gap: theme.spacings.s24,
        justifyContent: 'space-between',
        p: `${theme.spacings.s24}px ${theme.layout.pageGutterTablet}px`,
      }}
    >
      <Styled.Wrapper flexDirection="column" gap={theme.spacings.s8}>
        <Logo markSrc={asset('logo-mark.png')} scheme="on-surface" title="my-interview.tech" />

        <Text as="p" color={theme.colors.textSecondary} font="body">
          {TEXT.TAGLINE[0]}
          <br />
          {TEXT.TAGLINE[1]}
        </Text>

        <Flex flexWrap="wrap" gap={theme.spacings.s6}>
          {SOCIALS.map(({ href, icon, label }) => (
            <Button
              key={label}
              Component={<SocialButton href={href || undefined} iconSrc={asset(icon)} label={label} />}
            />
          ))}
        </Flex>
      </Styled.Wrapper>

      <Styled.Legal flexDirection="column" gap={theme.spacings.s4}>
        <Text as="p" color={theme.colors.textSecondary} font="body">
          {TEXT.COPYRIGHT}
        </Text>

        <Text as="p" color={theme.colors.textTertiary} font="caption">
          {TEXT.REQUISITES}{' '}
          <Text
            as="a"
            color={theme.colors.textTertiary}
            href={externalLinks.rusprofile}
            rel="noreferrer"
            target="_blank"
          >
            {TEXT.RUSPROFILE}
          </Text>
        </Text>
      </Styled.Legal>
    </Styled.Container>
  )
}
