import { Flex, Text, theme } from '@my-interview/ui-kit'

import { Styled } from './Toc.styled'
import type { TocItem, TocProps } from './Toc.types'

/**
 * Оглавление страницы.
 *
 * @description
 * - `group` — подпись без перехода.
 * - `link` — пункт. Активный подсвечен, `level: 2` сдвинут вправо, `isDimmed` приглушён.
 * - До 768px блок скрыт.
 */
export const Toc = <T extends TocItem>({ activeId, items, label, onSelect }: TocProps<T>) => (
  <Styled.Container aria-label={label}>
    <Flex p={`${theme.spacings.s2}px ${theme.spacings.s12}px ${theme.spacings.s8}px`}>
      <Text uppercase as="p" color={theme.colors.textTertiary} font={200} tracking="wide" weight="semibold">
        {label}
      </Text>
    </Flex>

    {items.map((item) =>
      item.type === 'group' ? (
        <Flex key={item.id} p={`${theme.spacings.s8}px ${theme.spacings.s12}px`}>
          <Text as="p" color={theme.colors.textPrimary} font={400} weight="semibold">
            {item.label}
          </Text>
        </Flex>
      ) : (
        <Styled.Item
          fullWidth
          key={item.id}
          $isDimmed={Boolean(item.isDimmed)}
          $level={item.level === 2 ? 2 : 1}
          aria-current={item.id === activeId ? 'location' : undefined}
          isSelected={item.id === activeId}
          type="button"
          variant="text"
          onClick={() => onSelect(item)}
        >
          {item.label}
        </Styled.Item>
      )
    )}
  </Styled.Container>
)
