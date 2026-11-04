import { useTheme } from 'styled-components'

import { Flex, Image, Text } from '@my-interview/ui-kit'

import { asset } from '@shared/constants'
import { HomeSection } from '@shared/ui/home-section'

import { STORES, TEXT } from '../config'
import { Styled } from './styled'

/**
 * Секция скачивания приложения.
 * @access private
 * @todo реализовать Android приложение.
 */
export const HomeDownload = () => {
  const theme = useTheme()

  return (
    <HomeSection surface="white">
      <Styled.Card
        alignItems="center"
        flexDirection="column"
        gap={theme.spacings.s40}
        tablet={{ flexDirection: 'row', justifyContent: 'space-between' }}
      >
        <Styled.Copy flexDirection="column" gap={theme.spacings.s24}>
          <Image alt="" height={68} src={asset('brand-app.svg')} width={68} />

          <Flex flexDirection="column" gap={theme.spacings.s12}>
            <Text as="h2" color={theme.colors.downloadTitle} font="downloadTitle">
              {TEXT.TITLE}
            </Text>

            <Text as="p" color={theme.colors.downloadText} font="navLink">
              {TEXT.LEAD}
            </Text>
          </Flex>

          <Styled.Stores
            fillWidth
            alignItems="center"
            flexWrap="wrap"
            gap={theme.spacings.s8}
            tablet={{ flexWrap: 'nowrap', width: 'fit-content' }}
          >
            {STORES.map((store) => {
              const content = (
                <>
                  <Image alt="" height={20} src={asset(store.icon)} width={20} />
                  <Flex flexDirection="column">
                    <Text color={theme.colors.textOnHeroMuted} font="storeCaption">
                      {store.caption}
                    </Text>
                    <strong>{store.title}</strong>
                  </Flex>
                </>
              )

              if (!store.href) {
                return (
                  <Styled.Store key={store.title} alignItems="center" forwardedAs="span" gap={theme.spacings.s10}>
                    {content}
                  </Styled.Store>
                )
              }

              return (
                <Styled.Store
                  key={store.title}
                  alignItems="center"
                  forwardedAs="a"
                  gap={theme.spacings.s10}
                  href={store.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {content}
                </Styled.Store>
              )
            })}
          </Styled.Stores>
        </Styled.Copy>
        <Styled.Phone alt={TEXT.PHONE_ALT} src={asset('phone-showcase.png')} />
      </Styled.Card>
    </HomeSection>
  )
}
