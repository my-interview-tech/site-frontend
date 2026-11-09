import type { Meta, StoryObj } from '@storybook/react-vite'

import { Markdown } from '../Markdown'

const SAMPLE = `## Зачем нужен DOCTYPE? {#why}

Абзац с \`inline\` и **акцентом**.

> Цитата про режим рендеринга.

- пункт списка

\`\`\`ts doctype.ts
const answer = document.doctype
\`\`\`

---

[Документация](/topics/html)

| Тег | Роль |
| --- | --- |
| html | корень |
`

const meta = {
  title: 'common/components/Markdown',
  component: Markdown,
  args: {
    children: SAMPLE,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Markdown>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
