import type { Article } from '../../model'

import { offer } from './offer'

export const htmlAttributesArticle: Article = {
  access: 'subscription',
  accordion: {
    caption: 'Глобальные атрибуты · продолжение после DOCTYPE',
    imageSrc: '/guest/icon-html.svg',
    interview: {
      body: 'Просят назвать атрибуты, которые можно поставить почти на любой элемент, и показать id, class и hidden.',
      label: 'Связь с интервью',
      title: 'Что от вас ждут',
    },
    isAvailable: false,
    title: 'Зачем читать эту статью',
  },
  ad: { label: 'Реклама', size: '240 × 400' },
  badge: { label: 'По подписке', variant: 'accent' },
  content: {
    markdown: `
## Глобальные атрибуты {#global}

Часть атрибутов не привязана к одному тегу. id, class, hidden, lang и title можно поставить почти на любой элемент.

\`\`\`html
<p id="lead" class="intro">
\`\`\`
`,
    nextStep: null,
    previousStep: {
      href: '/topics/html/articles/doctype',
      id: 'doctype',
      title: 'Что такое DOCTYPE в HTML?',
    },
  },
  id: 'html-attributes',
  meta: {
    complexity: '2',
    importance: '2',
    keywords: ['#id', '#class', '#hidden'],
    skill: ['frontend'],
    skillLabel: 'Навыки',
    subscribe: { href: 'https://t.me/frontend', label: 'frontend в Telegram' },
    tech: 'HTML',
  },
  offer,
  title: 'Атрибуты и глобальные атрибуты HTML',
  toc: [{ id: 'global', label: 'Глобальные атрибуты' }],
  tocLabel: 'На этой странице',
}
