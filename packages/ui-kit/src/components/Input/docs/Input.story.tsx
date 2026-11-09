import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '../Input'

const meta = {
  title: 'ui-kit/components/Input',
  component: Input,
  args: {
    label: 'Поиск',
    placeholder: 'Поиск',
    value: '',
    onChange: () => undefined,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

const Controlled = ({ type }: { type?: string }) => {
  const [value, setValue] = useState('')

  return <Input label="Поиск" placeholder="Поиск" type={type} value={value} onChange={setValue} />
}

export const Default: Story = {
  render: () => <Controlled />,
}

export const Search: Story = {
  render: () => <Controlled type="search" />,
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Недоступно',
  },
}
