/* eslint-disable import/no-internal-modules */
import type { Article, ArticleContext, ArticleRequest } from '../model'

import { doctypeArticle } from './articles/doctype'
import { htmlAttributesArticle } from './articles/html-attributes'
import { htmlStructureArticle } from './articles/html-structure'
import { offer } from './articles/offer'
import { reactHooksArticle, useEffectArticle, useStateArticle } from './articles/react'

const techTitles: Record<string, string> = {
  api: 'API',
  browser: 'Браузер и сеть',
  bpmn: 'BPMN',
  cicd: 'CI/CD',
  css: 'CSS',
  cypress: 'Cypress',
  docker: 'Docker',
  docs: 'Документация',
  git: 'Git',
  go: 'Go',
  grpc: 'gRPC',
  html: 'HTML',
  javascript: 'JavaScript',
  kafka: 'Kafka',
  kubernetes: 'Kubernetes',
  ml: 'ML',
  network: 'Сети',
  nextjs: 'Next.js',
  nginx: 'Nginx',
  pandas: 'Pandas',
  patterns: 'Паттерны',
  playwright: 'Playwright',
  postgresql: 'PostgreSQL',
  python: 'Python',
  'react-query': 'React Query',
  react: 'React',
  redis: 'Redis',
  redux: 'Redux',
  requirements: 'Требования',
  sql: 'SQL',
  statistics: 'Статистика',
  'system-design': 'System Design',
  terraform: 'Terraform',
  testing: 'Тестирование',
  typescript: 'TypeScript',
  webpack: 'Webpack',
  zustand: 'Zustand',
}

const questionTitles: Record<string, string> = {
  'nextjs/1': 'Как Next.js реализует серверный рендеринг (SSR)?',
  'nextjs/11': 'Как работает getStaticProps в Pages Router?',
  'nextjs/12': 'Чем отличаются getStaticProps, getServerSideProps и getStaticPaths?',
  'nextjs/13': 'Реализуйте инвалидацию кэша с помощью revalidatePath',
  'nextjs/14':
    'Что такое Incremental Static Regeneration (ISR) и когда её использовать в приложении с большим объёмом данных?',
  'nextjs/2': 'В чём разница между SSR, SSG и ISR?',
  'nextjs/3': 'Реализуйте кастомный хук для получения данных с кэшированием',
  'nextjs/4': 'Что такое React Server Components?',
  'nextjs/6': 'Как устроена файловая система роутинга в App Router?',
  'nextjs/7': 'Чем отличаются Server Components от Client Components?',
  'nextjs/8': 'Настройте динамические маршруты с несколькими параметрами',
  'nextjs/9': 'Что делает файл layout.tsx и как работает вложенность?',
}

const articles: Record<string, Article> = {
  'html:5': doctypeArticle,
  'html:6': htmlAttributesArticle,
  'html:7': htmlStructureArticle,
  'react:5': reactHooksArticle,
  'react:6': useStateArticle,
  'react:7': useEffectArticle,
}

const LOCKED_SUFFIX = '-locked'
const LOAD_MS = 400

const techLabel = (tech: string) => techTitles[tech] ?? tech

const questionTitle = (tech: string, id: string) => {
  const named = questionTitles[`${tech}/${id}`]

  if (named) {
    return named
  }

  const label = techLabel(tech)

  if (id === '2') {
    return `Какие темы по ${label} спрашивают чаще всего?`
  }

  if (id === '3') {
    return `Короткое практическое задание по ${label}`
  }

  if (id === '1') {
    return `С чего начать подготовку по ${label}?`
  }

  return `Вопрос по ${label}`
}

const accordionFor = (tech: string, label: string): ArticleContext => ({
  caption: `Основы ${label}`,
  imageSrc: `/guest/icon-${tech}.svg`,
  interview: {
    body: `Проверяют, можете ли вы коротко объяснить базовую тему по ${label}.`,
    label: 'Связь с интервью',
    title: 'Что от вас ждут',
  },
  isAvailable: true,
  result: {
    items: [`Сформулировать ответ по теме «${label}»`, 'Отличить базовый вопрос от продвинутого'],
    label: 'После прочтения вы сможете',
  },
  title: 'Зачем читать эту статью',
})

const shortArticle = (tech: string, id: string): Article => {
  const label = techLabel(tech)
  const title = questionTitle(tech, id)

  return {
    access: 'open',
    accordion: accordionFor(tech, label),
    ad: { label: 'Реклама', size: '240 × 400' },
    content: {
      markdown: `
## Коротко {#overview}

${title} Короткий мок, чтобы переход из списка не вёл в пустую страницу.
`,
      nextStep: null,
      previousStep: null,
    },
    id,
    meta: {
      complexity: '1',
      importance: '1',
      keywords: [`#${id}`],
      skill: ['frontend'],
      skillLabel: 'Навыки',
      subscribe: { href: 'https://t.me/frontend', label: 'frontend в Telegram' },
      tech: label,
    },
    title,
    toc: [{ id: 'overview', label: 'Коротко' }],
    tocLabel: 'На этой странице',
  }
}

const lockArticle = (article: Article, id: string): Article => {
  if (article.access === 'subscription') {
    return { ...article, id }
  }

  const { markdown, nextStep, previousStep } = article.content

  return {
    access: 'subscription',
    accordion: { ...article.accordion, isAvailable: false },
    ad: article.ad,
    badge: { label: 'По подписке', variant: 'accent' },
    content: { markdown, nextStep, previousStep },
    id,
    meta: article.meta,
    offer,
    title: article.title,
    toc: article.toc.filter((item) => item.id !== 'resources'),
    tocLabel: article.tocLabel,
  }
}

const resolveArticle = ({ id, tech }: ArticleRequest): Article => {
  const locked = id.endsWith(LOCKED_SUFFIX)
  const articleId = locked ? id.slice(0, -LOCKED_SUFFIX.length) : id
  const article = articles[`${tech}:${articleId}`]

  if (!article) {
    return shortArticle(tech, id)
  }

  if (!locked) {
    return article
  }

  return lockArticle(article, id)
}

const loadArticle = (request: ArticleRequest): Promise<Article> =>
  new Promise((resolve, reject) => {
    globalThis.setTimeout(() => {
      if (request.id === 'error') {
        reject(new Error('unavailable'))

        return
      }

      resolve(resolveArticle(request))
    }, LOAD_MS)
  })

export { loadArticle }
