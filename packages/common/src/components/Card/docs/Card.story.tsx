import type { Meta, StoryObj } from '@storybook/react-vite'

import { Flex, Text, theme } from '@my-interview/ui-kit'

import { Card } from '../Card'
import type { CardRadius } from '../Card.types'

const RADII = [10, 12, 16] as const satisfies readonly CardRadius[]

const meta = {
  title: 'common/components/Card',
  component: Card,
  args: {
    children: <Text font={400}>Содержимое карточки</Text>,
    flexDirection: 'column',
    gap: theme.spacings.s8,
    p: theme.spacings.s20,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Radii: Story = {
  render: (args) => (
    <Flex gap={theme.spacings.s12}>
      {RADII.map((radius) => (
        <Card key={radius} {...args} radius={radius}>
          <Text font={400}>{`radius ${radius}`}</Text>
        </Card>
      ))}
    </Flex>
  ),
}
