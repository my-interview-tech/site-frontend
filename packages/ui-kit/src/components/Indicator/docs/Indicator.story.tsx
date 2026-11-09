import type { Meta, StoryObj } from '@storybook/react-vite'

import { theme } from '../../../theme/theme'
import { Flex } from '../../Flex'
import { Indicator } from '../Indicator'

const meta = {
  title: 'ui-kit/components/Indicator',
  component: Indicator,
  args: {
    value: 2,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Indicator>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Scale: Story = {
  render: () => (
    <Flex alignItems="center" gap={theme.spacings.s8}>
      {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const).map((value) => (
        <Indicator key={value} value={value} />
      ))}
    </Flex>
  ),
}
