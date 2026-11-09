import { Flex, GridItem, Image, Link, Text, Title, theme } from '@my-interview/ui-kit'

import type { InfoLine, InfoPageProps } from '../types'
import { Styled } from './styled'

const hasText = (line: InfoLine): line is InfoLine & { TEXT: string } => Boolean(line.TEXT)

/**
 * Информационная страница: заголовок, описание и карточки.
 * @description Пустые слоты не рисуются. Карточка есть только если в ней есть строка с текстом.
 */
export const InfoPage = ({ BLOCKS, DESCRIPTION, TITLE }: InfoPageProps) => {
  const cards = (BLOCKS ?? []).flatMap((block) => {
    const lines = (block.LINES ?? []).filter(hasText)

    if (lines.length === 0) {
      return []
    }

    return [{ block, lines }]
  })

  return (
    <Styled.Container data-nav-surface="canvas">
      {TITLE ? (
        <Styled.DescriptionWrapper>
          <Title size={900} subtitle={DESCRIPTION} title={TITLE} titleAs="h2" />
        </Styled.DescriptionWrapper>
      ) : (
        DESCRIPTION && (
          <Styled.DescriptionWrapper>
            <Text as="p" color={theme.colors.textSecondary} font={500}>
              {DESCRIPTION}
            </Text>
          </Styled.DescriptionWrapper>
        )
      )}
      {cards.length > 0 && (
        <Styled.Board>
          {cards.map(({ block, lines }, index) => (
            <GridItem key={block.TITLE ?? index} size={6}>
              <Styled.Card
                flexDirection="column"
                forwardedAs="section"
                gap={theme.spacings.s12}
                p={`${theme.spacings.s28}px ${theme.spacings.s24}px`}
              >
                {block.TITLE && <Title size={700} title={block.TITLE} titleAs="h2" />}
                {lines.map((line) => {
                  const content = line.ICON ? (
                    <Flex inline alignItems="center" gap={theme.spacings.s8}>
                      <Image alt="" height={theme.spacings.s24} src={line.ICON} width={theme.spacings.s24} />
                      {line.TEXT}
                    </Flex>
                  ) : (
                    line.TEXT
                  )

                  if (line.HREF) {
                    return (
                      <Text
                        as={Link}
                        color={theme.colors.textBody}
                        font={500}
                        href={line.HREF}
                        key={line.TEXT}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {content}
                      </Text>
                    )
                  }

                  return (
                    <Text as="p" color={theme.colors.textBody} font={500} key={line.TEXT}>
                      {content}
                    </Text>
                  )
                })}
                {block.IMAGE?.SRC && (
                  <Image
                    alt={block.IMAGE.ALT ?? ''}
                    height={theme.spacings.s96}
                    src={block.IMAGE.SRC}
                    width={theme.spacings.s96}
                  />
                )}
              </Styled.Card>
            </GridItem>
          ))}
        </Styled.Board>
      )}
    </Styled.Container>
  )
}
