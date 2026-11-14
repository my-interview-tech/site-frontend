import type { Meta, StoryObj } from '@storybook/react-vite'

import { Flex, theme } from '@my-interview/ui-kit'

import { SkeletonRect } from '../SkeletonRect'

const meta = {
  title: 'common/components/SkeletonRect',
  component: SkeletonRect,
  args: {
    height: 16,
    width: 160,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SkeletonRect>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const FullWidth: Story = {
  args: {
    height: 22,
    width: undefined,
  },
}

export const Pill: Story = {
  args: {
    height: 28,
    radius: 999,
    width: 88,
  },
}

export const Stack: Story = {
  render: () => (
    <Flex flexDirection="column" gap={theme.spacings.s8}>
      <SkeletonRect height={16} width={72} />
      <SkeletonRect height={22} width="92%" />
      <SkeletonRect height={22} width="70%" />
    </Flex>
  ),
}
