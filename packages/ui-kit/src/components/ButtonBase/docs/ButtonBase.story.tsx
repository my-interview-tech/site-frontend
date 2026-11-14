import type { Meta, StoryObj } from '@storybook/react-vite'

import { ButtonBase } from '../ButtonBase'

const meta = {
  title: 'ui-kit/components/ButtonBase',
  component: ButtonBase,
  args: {
    children: 'Кнопка без оформления',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonBase>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Loading: Story = {
  args: { isLoading: true },
}

export const AsAnchor: Story = {
  render: ({ children, disabled }) => (
    <ButtonBase as="a" disabled={disabled} href="#base">
      {children}
    </ButtonBase>
  ),
}
