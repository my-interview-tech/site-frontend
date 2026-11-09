import { Icon, Image, Link, Title, theme } from '@my-interview/ui-kit'

import { asset } from '@shared/constants'
import { HomeSection } from '@shared/ui/home-section'

import { STORES, TEXT } from '../config'
import { Styled } from './styled'

/**
 * Секция скачивания приложения.
 * @access private
 * @todo реализовать Android приложение.
 */
export const HomeDownload = () => (
  <HomeSection surface="white">
    <Styled.Card
      alignItems="center"
      flexDirection="column"
      gap={theme.spacings.s40}
      tablet={{ flexDirection: 'row', justifyContent: 'space-between' }}
    >
      <Styled.Copy flexDirection="column" gap={theme.spacings.s24}>
        <Icon iconSrc="brand-app" size={68} />
        <Title size={900} subtitle={TEXT.LEAD} title={TEXT.TITLE} titleAs="h2" />

        <Styled.Stores
          fillWidth
          alignItems="center"
          flexWrap="wrap"
          gap={theme.spacings.s8}
          p={theme.spacings.s6}
          tablet={{ flexWrap: 'nowrap', width: 'fit-content' }}
        >
          {STORES.map((store) => {
            const content = (
              <>
                <Icon iconSrc={store.icon} size={20} />
                <Title isReversed size={400} subtitle={store.caption} title={store.title} />
              </>
            )

            if (!store.href) {
              return (
                <Styled.Store
                  key={store.title}
                  alignItems="center"
                  forwardedAs="span"
                  gap={theme.spacings.s10}
                  p={`9px ${theme.spacings.s16}px 9px ${theme.spacings.s14}px`}
                >
                  {content}
                </Styled.Store>
              )
            }

            return (
              <Styled.Store
                key={store.title}
                alignItems="center"
                forwardedAs={Link}
                gap={theme.spacings.s10}
                p={`9px ${theme.spacings.s16}px 9px ${theme.spacings.s14}px`}
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
      <Image
        alt={TEXT.PHONE_ALT}
        desktopS={{ height: 500, width: 500 }}
        height="auto"
        maxHeight={320}
        src={asset('images/phone-showcase.png')}
        tablet={{ height: 'auto', maxHeight: 'none', width: 'min(360px, 42%)' }}
        width="100%"
      />
    </Styled.Card>
  </HomeSection>
)
