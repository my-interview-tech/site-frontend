import type { Meta, StoryObj } from '@storybook/react-vite'
import styled from 'styled-components'

import { Grid, GridItem } from '../Grid'

const Block = styled.div`
  background: rgba(114, 46, 209, 0.12);
  min-height: 80px;
  padding: 16px;
`

const meta = {
  title: 'ui-kit/components/Grid',
  component: Grid,
  args: {
    children: [
      <GridItem key="start" size={3}>
        <Block>3</Block>
      </GridItem>,
      <GridItem key="middle" size={6}>
        <Block>6</Block>
      </GridItem>,
      <GridItem key="end" size={3}>
        <Block>3</Block>
      </GridItem>,
    ],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Grid>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
