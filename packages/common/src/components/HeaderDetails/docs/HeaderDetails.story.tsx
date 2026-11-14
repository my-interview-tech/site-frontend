import type { Meta, StoryObj } from '@storybook/react-vite'

import { HeaderDetails } from '../HeaderDetails'

const meta = {
  title: 'common/components/HeaderDetails',
  component: HeaderDetails,
  args: {
    interview: {
      body: 'Проверяют, можете ли вы объяснить базовую тему и показать, где её применяют.',
      caption: 'Связь с интервью',
      title: 'Что от вас ждут',
    },
    result: {
      caption: 'После прочтения вы сможете',
      items: ['Сформулировать ответ', 'Отличить базовый вопрос от продвинутого'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeaderDetails>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
