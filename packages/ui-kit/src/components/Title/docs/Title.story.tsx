import type { Meta, StoryObj } from '@storybook/react-vite'

import { theme } from '../../../theme/theme'
import { Button } from '../../Button'
import { Flex } from '../../Flex'
import { Title } from '../Title'
import type { TitleSize } from '../Title.types'

const SIZES = [400, 500, 600, 700, 800, 900] as const satisfies readonly TitleSize[]

const meta = {
  title: 'ui-kit/components/Title',
  component: Title,
  args: {
    subtitle: 'Коротко, о чём блок.',
    title: 'Зачем читать эту статью',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Title>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Reversed: Story = {
  args: { isReversed: true, subtitle: 'Раздел 2' },
}

export const WithAction: Story = {
  args: {
    action: (
      <Button size={32} variant="text">
        Все
      </Button>
    ),
    size: 700,
    titleAs: 'h2',
  },
}

export const Sizes: Story = {
  render: ({ subtitle, title }) => (
    <Flex flexDirection="column" gap={theme.spacings.s24}>
      {SIZES.map((size) => (
        <Title key={size} size={size} subtitle={subtitle} title={`${size}: ${String(title)}`} />
      ))}
    </Flex>
  ),
}
