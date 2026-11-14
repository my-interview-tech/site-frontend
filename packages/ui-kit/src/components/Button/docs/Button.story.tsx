import type { Meta, StoryObj } from '@storybook/react-vite'

import { theme } from '../../../theme/theme'
import { Flex } from '../../Flex'
import { Button } from '../Button'
import type { ButtonShape, ButtonSize, ButtonVariant } from '../Button.types'

const VARIANTS = ['primary', 'secondary', 'glass', 'inverse', 'text'] as const satisfies readonly ButtonVariant[]
const SIZES = [32, 40, 48, 56] as const satisfies readonly ButtonSize[]

const meta = {
  title: 'ui-kit/components/Button',
  component: Button,
  args: {
    children: 'Кнопка',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

const renderShapes =
  (shape: ButtonShape): Story['render'] =>
  ({ children, size }) => (
    <Flex flexWrap="wrap" gap={theme.spacings.s12}>
      {VARIANTS.map((variant) => (
        <Button key={variant} shape={shape} size={size} variant={variant}>
          {children}
        </Button>
      ))}
    </Flex>
  )

export const Rect: Story = {
  args: { shape: 'rect' },
  render: renderShapes('rect'),
}

export const Round: Story = {
  args: { shape: 'round' },
  render: renderShapes('round'),
}

export const Loading: Story = {
  render: ({ children, size }) => (
    <Flex flexWrap="wrap" gap={theme.spacings.s12}>
      {VARIANTS.map((variant) => (
        <Button isLoading key={variant} size={size} variant={variant}>
          {children}
        </Button>
      ))}
    </Flex>
  ),
}

export const Sizes: Story = {
  args: { variant: 'primary' },
  render: ({ children, variant }) => (
    <Flex alignItems="center" gap={theme.spacings.s12}>
      {SIZES.map((size) => (
        <Button key={size} size={size} variant={variant}>
          {children} {size}
        </Button>
      ))}
    </Flex>
  ),
}

export const Disabled: Story = {
  args: {
    children: 'Сдать',
  },
  render: ({ children, size }) => (
    <Flex flexWrap="wrap" gap={theme.spacings.s12}>
      {VARIANTS.map((variant) => (
        <Button disabled key={variant} size={size} variant={variant}>
          {children}
        </Button>
      ))}
    </Flex>
  ),
}
