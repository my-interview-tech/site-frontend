import styled from 'styled-components'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { theme } from '../../../theme/theme'
import { Text } from '../../Text'
import { Carousel } from '../Carousel'

const items = [
  { id: 'one', label: 'Один' },
  { id: 'two', label: 'Два' },
  { id: 'three', label: 'Три' },
  { id: 'four', label: 'Четыре' },
]

type Item = (typeof items)[number]

const Card = styled.div`
  background: ${theme.colors.accentSoft};
  border-radius: ${theme.radii.r16}px;
  height: 120px;
  padding: ${theme.spacings.s16}px;
`

const meta = {
  title: 'ui-kit/components/Carousel',
  component: Carousel,
  args: {
    items,
    renderItem: (item: Item) => (
      <Card>
        <Text>{item.label}</Text>
      </Card>
    ),
    visible: 3,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel<Item>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SingleCard: Story = {
  args: { items: items.slice(0, 1) },
}
