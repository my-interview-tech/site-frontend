import type { Meta, StoryObj } from '@storybook/react-vite'

import { theme } from '../../../theme/theme'
import { Flex } from '../../Flex'
import { Text } from '../../Text'
import { Progress } from '../Progress'

const VALUES = [0, 40, 100] as const

const meta = {
  title: 'ui-kit/components/Progress',
  component: Progress,
  args: {
    label: 'Изучено',
    value: 40,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Progress>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Flex flexDirection="column" gap={theme.spacings.s16}>
      {VALUES.map((value) => (
        <Progress key={value} {...args} value={value} />
      ))}
    </Flex>
  ),
}

export const WithCaption: Story = {
  render: (args) => (
    <Flex flexDirection="column" gap={theme.spacings.s8} width={280}>
      <Text font={500} weight="semibold">
        React
      </Text>
      <Text color={theme.colors.textSecondary} font={200}>
        12 вопросов · 5 изучено
      </Text>
      <Progress {...args} />
    </Flex>
  ),
}
