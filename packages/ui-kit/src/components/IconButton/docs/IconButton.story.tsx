import type { Meta, StoryObj } from '@storybook/react-vite'

import { theme } from '../../../theme/theme'
import { Flex } from '../../Flex'
import { IconButton } from '../IconButton'
import type { IconButtonVariant } from '../IconButton.types'

const VARIANTS = ['secondary', 'glass', 'text'] as const satisfies readonly IconButtonVariant[]

const meta = {
  title: 'ui-kit/components/IconButton',
  component: IconButton,
  args: {
    iconSrc: 'icon-nav',
    label: 'Навыки',
    onClick: () => undefined,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IconButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: (args) => (
    <Flex gap={theme.spacings.s12}>
      {VARIANTS.map((variant) => (
        <IconButton key={variant} {...args} variant={variant} />
      ))}
    </Flex>
  ),
}
