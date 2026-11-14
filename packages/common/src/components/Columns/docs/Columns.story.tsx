import type { Meta, StoryObj } from '@storybook/react-vite'
import styled from 'styled-components'

import { theme } from '@my-interview/ui-kit'

import { Columns } from '../Columns'

const Pane = styled.div`
  background: ${theme.colors.surface};
  border: 1px dashed ${theme.colors.borderStrong};
  padding: ${theme.spacings.s16}px;
`

const panes = (
  <>
    <Pane>
      Основная
      <br />
      колонка выше сайдбара
    </Pane>
    <Pane>Сайдбар</Pane>
  </>
)

const meta = {
  title: 'common/components/Columns',
  component: Columns,
  args: {
    children: panes,
    gap: 20,
    sidebar: 240,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Columns>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
