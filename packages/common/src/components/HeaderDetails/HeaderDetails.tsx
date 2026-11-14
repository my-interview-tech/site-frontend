import { Flex, Text, Title, theme } from '@my-interview/ui-kit'

import type { HeaderDetailsProps } from './HeaderDetails.types'

/**
 * Раскрытое тело шапки: ожидания и вывод.
 */
export const HeaderDetails = ({ interview, result }: HeaderDetailsProps) => (
  <>
    <Flex flexDirection="column" gap={theme.spacings.s8}>
      <Title isReversed size={600} subtitle={interview.caption} title={interview.title} titleAs="p" />

      {interview.body && (
        <Text as="p" color={theme.colors.textSecondary} font={400}>
          {interview.body}
        </Text>
      )}
    </Flex>

    {result && (
      <Flex flexDirection="column" gap={theme.spacings.s8}>
        <Title size={400} title={result.caption} titleAs="p" />
        <Flex as="ol" flexDirection="column" gap={theme.spacings.s8}>
          {result.items.map((item) => (
            <Text key={item} as="li" color={theme.colors.textSecondary} font={400}>
              {item}
            </Text>
          ))}
        </Flex>
      </Flex>
    )}
  </>
)
