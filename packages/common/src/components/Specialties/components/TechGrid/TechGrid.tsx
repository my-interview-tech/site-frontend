import type { TechCard as TechCardData } from '../../Specialties.types'
import { TechCard } from '../TechCard'

import { Styled } from './TechGrid.styled'

export type TechGridProps = {
  gridKey: string
  items: readonly TechCardData[]
}

/**
 * Сетка технологий выбранной специальности или вкладки.
 * @description Своя сетка, а не `Grid` из ui-kit: на планшете две колонки, с `desktopS` — три.
 */
export const TechGrid = ({ gridKey, items }: TechGridProps) => (
  <Styled.Grid key={gridKey}>
    {items.map((item) => (
      <TechCard key={item.title} item={item} />
    ))}
  </Styled.Grid>
)
