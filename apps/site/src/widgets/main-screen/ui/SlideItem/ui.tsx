import { useTheme } from 'styled-components'
import { Button, Flex, Text } from '@my-interview/ui-kit'

import { asset } from '@shared/constants'
import { SLIDES } from '../../config'
import { Styled } from './styled'

type SlideItemProps = {
  /** Индекс слайда в `SLIDES`. */
  index: number
}

/**
 * Содержимое одного слайда: текст, кнопка и иллюстрация.
 * @access private
 */
export const SlideItem = ({ index }: SlideItemProps) => {
  const theme = useTheme()
  const item = SLIDES[index]

  if (!item) {
    return null
  }

  return (
    <>
      <Styled.Container
        fillWidth
        relatively
        desktopS={{ flex: '0 0 560px' }}
        flex="none"
        flexDirection="column"
        gap={24}
        tablet={{ flex: '1 1 320px' }}
      >
        <Text as="h1" color={theme.colors.textOnHero} font="heroMobile" tablet={{ font: 'hero' }}>
          {item?.title}
        </Text>

        <Styled.Wrapper>
          <Text as="p" color={theme.colors.textOnHeroMuted} font="heroLead">
            {item?.subTitle}
          </Text>
        </Styled.Wrapper>

        <Flex>
          <Button href={item?.ctaHref} size="lg" variant="on-hero">
            {item?.cta}
          </Button>
        </Flex>
      </Styled.Container>

      <Styled.Image alt={item?.imageAlt} src={asset(item?.image)} />
    </>
  )
}
