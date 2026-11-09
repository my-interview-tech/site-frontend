import type { Meta, StoryObj } from '@storybook/react-vite'

import { Flex } from '../../Flex'
import { Icon } from '../Icon'

const meta = {
  title: 'ui-kit/components/Icon',
  component: Icon,
  args: {
    iconSrc: 'icon-react',
    size: 40,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Directions: Story = {
  args: {
    iconSrc: 'icon-chevron',
    isMonochrome: true,
    size: 24,
  },
  render: (args) => (
    <Flex gap={16}>
      <Icon {...args} direction="up" />
      <Icon {...args} direction="right" />
      <Icon {...args} direction="down" />
      <Icon {...args} direction="left" />
    </Flex>
  ),
}
