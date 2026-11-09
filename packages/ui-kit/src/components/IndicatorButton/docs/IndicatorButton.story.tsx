import type { Meta, StoryObj } from '@storybook/react-vite'

import { theme } from '../../../theme/theme'
import { Flex } from '../../Flex'
import { IndicatorButton } from '../IndicatorButton'

const meta = {
  title: 'ui-kit/components/IndicatorButton',
  component: IndicatorButton,
  args: {
    counter: 3,
    iconSrc: 'icon-bookmark',
    label: 'Закладка',
    onClick: () => undefined,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IndicatorButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutCounter: Story = {
  args: { counter: 0 },
}

export const Sizes: Story = {
  render: (args) => (
    <Flex alignItems="center" gap={theme.spacings.s12}>
      <IndicatorButton {...args} size={32} variant="text" />
      <IndicatorButton {...args} counter={12} size={40} />
      <IndicatorButton {...args} counter={128} size={48} variant="glass" />
    </Flex>
  ),
}
