import type { Meta, StoryObj } from '@storybook/react-vite'
import styled from 'styled-components'

import { Container } from '../Container'

const Block = styled.div`
  background: rgba(114, 46, 209, 0.12);
  min-height: 80px;
  padding: 16px;
`

const meta = {
  title: 'ui-kit/components/Container',
  component: Container,
  args: {
    children: <Block>Поля страницы меняются на планшете и мобильном</Block>,
  },
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Container>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
