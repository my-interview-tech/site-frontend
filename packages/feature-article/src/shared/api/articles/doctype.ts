import type { Article } from '../../model'

export const doctypeArticle: Article = {
  access: 'open',
  accordion: {
    caption: 'Основы HTML · базовый вопрос на Junior-собеседованиях',
    imageSrc: '/guest/icon-html.svg',
    interview: {
      body: 'Проверяют, понимаете ли вы назначение DOCTYPE и умеете ли указать корректную декларацию HTML5. Без этого сложнее объяснить режимы рендеринга и отличие современной разметки от устаревших стандартов.',
      label: 'Связь с интервью',
      title: 'Что от вас ждут',
    },
    isAvailable: true,
    result: {
      items: [
        'Объяснить, зачем нужен DOCTYPE и как он влияет на рендеринг',
        'Указать корректную декларацию HTML5',
        'Отличить современный DOCTYPE от устаревших вариантов',
      ],
      label: 'После прочтения вы сможете',
    },
    title: 'Зачем читать эту статью',
  },
  ad: { label: 'Реклама', size: '240 × 400' },
  content: {
    markdown: `
## Зачем нужен DOCTYPE? {#why}

DOCTYPE (сокращение от Document Type Declaration) — это служебная строка, которая сообщает браузеру, какой версии HTML следует следовать при рендеринге страницы. Для HTML5 декларация выглядит максимально просто:

\`\`\`html
<!-- декларация типа для HTML5 -->
<!doctype html>
\`\`\`

## Версии DOCTYPE в HTML {#versions}

За время существования HTML вышло несколько версий спецификации, и у каждой своя строка DOCTYPE:

- **HTML 4.01** — последняя версия классического HTML с тремя типами DTD
- **XHTML 1.0** — XML-совместимая версия с более строгими правилами разметки
- **XHTML 1.1** — дальнейшее развитие XML-модулярности
- **HTML5** — современный стандарт с максимально простой декларацией

Спецификацию HTML5 поддерживает и развивает консорциум **W3C** — из-за этого сегодня использовать краткую декларацию из примера выше — единственно верный вариант.
`,
    nextStep: {
      href: '/topics/html/6',
      id: '6',
      title: 'Атрибуты и глобальные атрибуты HTML',
    },
    previousStep: {
      href: '/topics/html/7',
      id: '7',
      title: 'Структура HTML-документа',
    },
    resources: [
      {
        href: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
        id: 'youtube-html',
        image: 'https://i.ytimg.com/vi/UB1O30fR-EE/hqdefault.jpg',
        title: 'HTML за час на YouTube',
      },
      {
        href: 'https://habr.com/ru/articles/272065/',
        id: 'habr-doctype',
        image: 'https://picsum.photos/id/1015/800/450',
        title: 'DOCTYPE на Хабре',
      },
      {
        href: 'https://developer.mozilla.org/ru/docs/Glossary/Doctype',
        id: 'mdn-doctype',
        image: 'https://picsum.photos/id/1016/800/450',
        title: 'DOCTYPE в MDN',
      },
      {
        href: 'https://www.youtube.com/watch?v=qz0aGYrrlhU',
        id: 'youtube-html5',
        image: 'https://i.ytimg.com/vi/qz0aGYrrlhU/hqdefault.jpg',
        title: 'HTML5 на YouTube',
      },
      {
        href: 'https://habr.com/ru/hubs/html/articles/',
        id: 'habr-html',
        image: 'https://picsum.photos/id/1036/800/450',
        title: 'Статьи по HTML на Хабре',
      },
    ],
  },
  id: '5',
  meta: {
    complexity: '2',
    importance: '1',
    keywords: ['#attribute', '#doctype'],
    skill: ['frontend'],
    skillLabel: 'Навыки',
    subscribe: { href: 'https://t.me/frontend', label: 'frontend в Telegram' },
    tech: 'HTML',
  },
  title: 'Что такое DOCTYPE в HTML?',
  toc: [
    { id: 'why', label: 'Зачем нужен DOCTYPE?' },
    { id: 'versions', label: 'Версии DOCTYPE в HTML' },
    { id: 'resources', label: 'Полезные материалы' },
  ],
  tocLabel: 'На этой странице',
}
