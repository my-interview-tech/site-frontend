import type { Meta, StoryObj } from '@storybook/react-vite'

import { STATIC_URL } from '../../../constants'
import { Image } from '../Image'

const IMAGES_URL = `${STATIC_URL}/images`

const meta = {
  title: 'ui-kit/components/Image',
  component: Image,
  args: {
    alt: 'Человек думает над вопросом',
    height: 197,
    src: `${IMAGES_URL}/quiz-think.png`,
    width: 256,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Image>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
