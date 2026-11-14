import type { Article } from '../../model'

export const htmlStructureArticle: Article = {
  access: 'open',
  accordion: {
    caption: 'Каркас страницы · первый вопрос про разметку',
    imageSrc: '/src/icons/icon-html.svg',
    interview: {
      body: 'Просят нарисовать минимальный документ и объяснить, зачем нужны html, head и body.',
      label: 'Связь с интервью',
      title: 'Что от вас ждут',
    },
    isAvailable: true,
    result: {
      items: ['Собрать каркас HTML-документа', 'Назвать роль head и body'],
      label: 'После прочтения вы сможете',
    },
    title: 'Зачем читать эту статью',
  },
  ad: { label: 'Реклама', size: '240 × 400' },
  content: {
    markdown: `
## Дерево документа {#tree}

Браузер строит страницу как дерево. Корень — элемент html, внутри него два обязательных узла: head для служебных данных и body для того, что видит человек.

\`\`\`html
<html>
  <head>…</head>
  <body>…</body>
</html>
\`\`\`

## Что лежит в корне {#parts}

- **html** — корневой элемент, задаёт язык документа
- **head** — заголовок, кодировка, стили и скрипты
- **body** — видимое содержимое страницы
`,
    nextStep: {
      href: '/topics/html/articles/5',
      id: '5',
      title: 'Что такое DOCTYPE в HTML?',
    },
    previousStep: null,
  },
  id: '7',
  meta: {
    complexity: '1',
    importance: '1',
    keywords: ['#html', '#head', '#body'],
    skill: ['frontend'],
    skillLabel: 'Навыки',
    subscribe: { href: 'https://t.me/frontend', label: 'frontend в Telegram' },
    tech: 'HTML',
  },
  title: 'Структура HTML-документа',
  toc: [
    { id: 'tree', label: 'Дерево документа' },
    { id: 'parts', label: 'Что лежит в корне' },
  ],
  tocLabel: 'На этой странице',
}
