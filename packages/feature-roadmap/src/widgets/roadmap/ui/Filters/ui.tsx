/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Flex, Select, theme } from '@my-interview/ui-kit'

import type { LayerId, LayerOption, StackId, StackOption } from '../../lib/graph'
import { TEXT } from '../../constants'

import { Styled } from './styled'

export type FiltersProps = {
  layer: LayerId | null
  /** Слои трека. Без них поле не показывается. */
  layers?: readonly LayerOption[]
  stack: StackId | null
  /** Стеки трека. Без них поле не показывается. */
  stacks?: readonly StackOption[]
  onLayerChange: (id: LayerId | null) => void
  onStackChange: (id: StackId | null) => void
}

const toOptions = (items: readonly { id: string; title: string }[]) =>
  items.map((item) => ({ id: item.id, label: item.title }))

/**
 * Фильтр пути: слой и стек. Повторный выбор пункта снимает фильтр.
 */
export const Filters = ({ layer, layers, onLayerChange, onStackChange, stack, stacks }: FiltersProps) => (
  <Styled.Root fillWidth flexWrap="wrap" gap={theme.spacings.s12} justifyContent="center">
    {layers && (
      <Flex flex="1 1 180px" flexDirection="column">
        <Select
          label={TEXT.LAYER}
          options={toOptions(layers)}
          placeholder={TEXT.ALL}
          value={layer ? [layer] : []}
          onChange={([id]) => onLayerChange(layers.find((item) => item.id === id)?.id ?? null)}
        />
      </Flex>
    )}
    {stacks && (
      <Flex flex="1 1 180px" flexDirection="column">
        <Select
          label={TEXT.STACK}
          options={toOptions(stacks)}
          placeholder={TEXT.ANY}
          value={stack ? [stack] : []}
          onChange={([id]) => onStackChange(stacks.find((item) => item.id === id)?.id ?? null)}
        />
      </Flex>
    )}
  </Styled.Root>
)
