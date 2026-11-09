import { theme } from '../../theme/theme'
import { Badge } from '../Badge'
import { Title } from '../Title'
import { Styled } from './Cell.styled'
import type { CellProps } from './Cell.types'

/**
 * Ячейка: иконка, заголовок с подзаголовком, бейдж и слот продукта справа.
 *
 * @description
 * - `slotCenter` заменяет `Title`.
 * - `badge` рисует ровно один `Badge`, остальное справа идёт в `slotAfter`.
 */
export const Cell = ({
  badge,
  isHoverable = false,
  isReversed = false,
  slotAfter,
  slotBefore,
  slotCenter,
  subtitle,
  title,
}: CellProps) => (
  <Styled.Root
    $isHoverable={isHoverable}
    alignItems="center"
    gap={theme.spacings.s16}
    p={`${theme.spacings.s16}px ${theme.spacings.s20}px`}
  >
    {slotBefore}

    <Styled.Center alignItems="center" flex={1}>
      {slotCenter ?? <Title isReversed={isReversed} subtitle={subtitle} title={title} />}
    </Styled.Center>

    {badge && <Badge {...badge} />}

    {slotAfter}
  </Styled.Root>
)
