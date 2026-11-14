import type { Meta, StoryObj } from '@storybook/react-vite'

import { theme } from '../../../theme/theme'
import { Flex } from '../../Flex'
import { Spinner } from '../Spinner'
import type { SpinnerSize } from '../Spinner.types'

const SIZES = [12, 16, 20] as const satisfies readonly SpinnerSize[]

const meta = {
  title: 'ui-kit/components/Spinner',
  component: Spinner,
  args: {
    size: 16,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <Flex alignItems="center" gap={theme.spacings.s16}>
      {SIZES.map((size) => (
        <Spinner key={size} size={size} />
      ))}
    </Flex>
  ),
}
