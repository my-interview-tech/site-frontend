import { Button, Flex, Link, Title, theme } from '@my-interview/ui-kit'

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
        <Flex>
          <Title size={900} subtitle={item.subTitle} title={item.title} titleAs="h1" />
        </Flex>

        <Flex>
          <Button as={Link} href="/" size={48} variant="inverse">
            {item?.cta}
          </Button>
        </Flex>
      </Styled.Container>

      <Styled.Image
        alt={item?.imageAlt ?? ''}
        fit="contain"
        height="auto"
        objectPosition="right center"
        radius={theme.radii.r20}
        src={asset(item?.image)}
        tablet={{ height: '100%', maxHeight: '100%', maxWidth: 'min(56vw, 1120px)', minWidth: 0, width: 'auto' }}
        width="100%"
      />
    </>
  )
}
