import type {
  TechnologyAd,
  TechnologyBadge,
  TechnologyContext,
  TechnologyItem,
  TechnologyRecommendations,
  TechnologyRequest,
  TechnologyScreen,
  TechnologySection,
  TechnologyUpgrade,
} from '../model'

type TechnologyDocument = Omit<TechnologyScreen, 'ad' | 'recommendations'>

type MockSection = Omit<TechnologySection, 'items' | 'upgrade'> & {
  items: Omit<TechnologyItem, 'href'>[]
  upgrade?: Omit<TechnologyUpgrade, 'action'>
}

const lead = 'Вопросы, задачи и квизы для подготовки к собеседованию'

const titles: Record<string, string> = {
  api: 'API',
  browser: 'Браузер и сеть',
  css: 'CSS',
  git: 'Git',
  html: 'HTML',
  javascript: 'JavaScript',
  nextjs: 'Next.js',
  patterns: 'Паттерны',
  react: 'React',
  'react-query': 'React Query',
  redux: 'Redux',
  'system-design': 'System Design',
  testing: 'Тестирование',
  typescript: 'TypeScript',
  webpack: 'Webpack',
  zustand: 'Zustand',
}

const icon = (slug: string): string => `/guest/icon-${slug === 'nextjs' ? 'next' : slug}.svg`

const topicHref = (slug: string): string => `/topics/${slug}`

const itemHref = (slug: string, { id, kind }: Omit<TechnologyItem, 'href'>): string =>
  `${topicHref(slug)}/${kind === 'task' ? 'tasks' : 'articles'}/${id}`

const questionBadge = (label: string): TechnologyBadge => ({ label, variant: 'question' })

const taskBadge = (label: string): TechnologyBadge => ({ label, variant: 'task' })

const quizBadge = (label: string): TechnologyBadge => ({ label, variant: 'quiz' })

const accordionFor = (
  slug: string,
  name: string,
  badges: TechnologyBadge[],
  isAvailable = true
): TechnologyContext => ({
  badges,
  caption: lead,
  imageSrc: icon(slug),
  interview: {
    body: `Проверяют, можете ли вы объяснить базовые темы по ${name} и показать, где их применяют.`,
    label: 'Связь с интервью',
    title: 'Что от вас ждут',
  },
  isAvailable,
  result: {
    items: [`Сформулировать ответ по основным темам ${name}`, 'Отличить базовый вопрос от продвинутого'],
    label: 'После изучения вы сможете',
  },
  title: `Зачем изучать ${name}`,
})

const withLinks = (slug: string, sections: MockSection[]): TechnologySection[] =>
  sections.map(({ items, upgrade, ...section }) => ({
    ...section,
    items: items.map((item) => ({ ...item, href: itemHref(slug, item) })),
    upgrade: upgrade && { ...upgrade, action: { type: 'locally' } },
  }))

const nextjsSections: MockSection[] = [
  {
    id: 'basics',
    anchor: 'basics',
    title: 'Основы Next.js',
    upgrade: {
      afterItemId: 'hook-cache',
      title: 'Открой полный трек Next.js',
      description: 'Ещё 42 вопроса, 20 задач и 13 квизов.',
      cta: 'Выбрать тариф',
    },
    items: [
      {
        id: 'ssr',
        index: 1,
        title: 'Как Next.js реализует серверный рендеринг (SSR)?',
        kind: 'question',
        isAvailable: true,
        isStudied: true,
      },
      {
        id: 'ssr-ssg-isr',
        index: 2,
        title: 'В чём разница между SSR, SSG и ISR?',
        kind: 'question',
        isAvailable: true,
        isStudied: true,
      },
      {
        id: 'hook-cache',
        index: 3,
        title: 'Реализуйте кастомный хук для получения данных с кэшированием',
        kind: 'task',
        isAvailable: true,
        isStudied: false,
      },
      {
        id: 'rsc',
        index: 4,
        title: 'Что такое React Server Components?',
        kind: 'quiz',
        isAvailable: true,
        isStudied: false,
      },
      {
        id: 'streaming',
        index: 5,
        title: 'Продвинутый: потоковый SSR с Suspense boundaries',
        kind: 'task',
        isAvailable: false,
        isStudied: false,
      },
    ],
  },
  {
    id: 'routing',
    anchor: 'routing',
    title: 'Страницы и роутинг',
    items: [
      {
        id: 'file-routing',
        index: 1,
        title: 'Как устроена файловая система роутинга в App Router?',
        kind: 'question',
        isAvailable: true,
        isStudied: true,
      },
      {
        id: 'server-client',
        index: 2,
        title: 'Чем отличаются Server Components от Client Components?',
        kind: 'question',
        isAvailable: true,
        isStudied: true,
      },
      {
        id: 'dynamic-routes',
        index: 3,
        title: 'Настройте динамические маршруты с несколькими параметрами',
        kind: 'task',
        isAvailable: true,
        isStudied: false,
        bookmarkCount: 2,
      },
      {
        id: 'layout',
        index: 4,
        title: 'Что делает файл layout.tsx и как работает вложенность?',
        kind: 'question',
        isAvailable: true,
        isStudied: false,
      },
      {
        id: 'parallel',
        index: 5,
        title: 'Как реализовать parallel routes и intercepting routes?',
        kind: 'quiz',
        isAvailable: false,
        isStudied: false,
      },
    ],
  },
  {
    id: 'data',
    anchor: 'data',
    title: 'Получение и рендеринг данных',
    items: [
      {
        id: 'get-static-props',
        index: 1,
        title: 'Как работает getStaticProps в Pages Router?',
        kind: 'question',
        isAvailable: true,
        isStudied: true,
      },
      {
        id: 'data-methods',
        index: 2,
        title: 'Чем отличаются getStaticProps, getServerSideProps и getStaticPaths?',
        kind: 'quiz',
        isAvailable: true,
        isStudied: false,
      },
      {
        id: 'revalidate',
        index: 3,
        title: 'Реализуйте инвалидацию кэша с помощью revalidatePath',
        kind: 'task',
        isAvailable: true,
        isStudied: false,
      },
      {
        id: 'isr',
        index: 4,
        title:
          'Что такое Incremental Static Regeneration (ISR) и когда её использовать в приложении с большим объёмом данных?',
        kind: 'article',
        isAvailable: true,
        isStudied: false,
      },
      {
        id: 'cache',
        index: 5,
        title: 'Продвинутый: оптимизация запросов с React cache() и Suspense',
        kind: 'task',
        isAvailable: false,
        isStudied: false,
      },
    ],
  },
]

const nextjsPage: TechnologyDocument = {
  slug: 'nextjs',
  title: 'Next.js',
  accordion: accordionFor('nextjs', 'Next.js', [
    questionBadge('45 вопросов'),
    taskBadge('20 задач'),
    quizBadge('13 квизов'),
  ]),
  sections: withLinks('nextjs', nextjsSections),
  resources: [
    {
      href: 'https://nextjs.org/docs',
      id: 'docs',
      image: 'https://i.ytimg.com/vi/UB1O30fR-EE/hqdefault.jpg',
      title: 'Документация Next.js',
    },
    {
      href: 'https://nextjs.org/docs/app',
      id: 'router',
      image: 'https://picsum.photos/id/1015/800/450',
      title: 'App Router',
    },
    {
      href: 'https://nextjs.org/docs/app/building-your-application/rendering',
      id: 'rsc',
      image: 'https://picsum.photos/id/1016/800/450',
      title: 'Server Components',
    },
    {
      href: 'https://nextjs.org/docs/app/building-your-application/caching',
      id: 'caching',
      image: 'https://i.ytimg.com/vi/qz0aGYrrlhU/hqdefault.jpg',
      title: 'Кэширование',
    },
  ],
  tocLabel: 'На этой странице',
  toc: [
    { id: 'basics', label: 'Основы Next.js' },
    { id: 'routing', label: 'Страницы и роутинг' },
    { id: 'data', label: 'Получение и рендеринг данных' },
    { id: 'resources', label: 'Полезные материалы' },
  ],
}

const shortPage = (slug: string): TechnologyDocument => {
  const title = titles[slug] ?? slug

  return {
    slug,
    title,
    accordion: accordionFor(slug, title, [questionBadge('12 вопросов'), taskBadge('4 задачи'), quizBadge('2 квиза')]),
    sections: withLinks(slug, [
      {
        id: 'basics',
        anchor: 'basics',
        title: `Основы ${title}`,
        upgrade: {
          afterItemId: `${slug}-task`,
          title: `Открой полный трек ${title}`,
          description: 'Ещё 12 вопросов, 4 задачи и 2 квиза.',
          cta: 'Выбрать тариф',
        },
        items: [
          {
            id: `${slug}-intro`,
            index: 1,
            title: `С чего начать подготовку по ${title}?`,
            kind: 'question',
            isAvailable: true,
            isStudied: true,
            bookmarkCount: 1,
          },
          {
            id: `${slug}-core`,
            index: 2,
            title: `Какие темы по ${title} спрашивают чаще всего?`,
            kind: 'question',
            isAvailable: true,
            isStudied: false,
          },
          {
            id: `${slug}-task`,
            index: 3,
            title: `Короткое практическое задание по ${title}`,
            kind: 'task',
            isAvailable: true,
            isStudied: false,
          },
          {
            id: `${slug}-locked`,
            index: 4,
            title: `Продвинутый разбор по ${title}`,
            kind: 'quiz',
            isAvailable: false,
            isStudied: false,
          },
        ],
      },
    ]),
    resources: [
      {
        href: '#',
        id: `${slug}-docs`,
        image: 'https://i.ytimg.com/vi/UB1O30fR-EE/hqdefault.jpg',
        title: `Документация ${title}`,
      },
      {
        href: '#',
        id: `${slug}-guide`,
        image: 'https://picsum.photos/id/1015/800/450',
        title: `Разбор ${title}`,
      },
      {
        href: '#',
        id: `${slug}-notes`,
        image: 'https://picsum.photos/id/1036/800/450',
        title: `Заметки ${title}`,
      },
    ],
    tocLabel: 'На этой странице',
    toc: [
      { id: 'basics', label: `Основы ${title}` },
      { id: 'resources', label: 'Полезные материалы' },
    ],
  }
}

const pageBySlug = (slug: string): TechnologyDocument => (slug === 'nextjs' ? nextjsPage : shortPage(slug))

const recommendationsBySlug = (slug: string): TechnologyRecommendations => {
  const target = slug === 'react' ? 'typescript' : 'react'

  return {
    label: 'Сначала изучите',
    item: {
      slug: target,
      href: topicHref(target),
      icon: icon(target),
      title: titles[target] ?? target,
      questionCount: 247,
      studiedCount: 0,
      progress: 0,
      cta: 'Перейти к вопросам',
    },
  }
}

const adSlot: TechnologyAd = {
  label: 'Реклама',
  size: '240 × 400',
}

const LOAD_MS = 400

const wait = <T>(value: T, slug: string): Promise<T> =>
  new Promise((resolve, reject) => {
    globalThis.setTimeout(() => {
      if (slug === 'error') {
        reject(new Error('unavailable'))

        return
      }

      resolve(value)
    }, LOAD_MS)
  })

const loadTechnology = (request: TechnologyRequest): Promise<TechnologyDocument> =>
  wait(pageBySlug(request.slug), request.slug)

const loadTechnologyRecommendations = (request: TechnologyRequest): Promise<TechnologyRecommendations> =>
  wait(recommendationsBySlug(request.slug), request.slug)

const loadAdSlot = (request: TechnologyRequest): Promise<TechnologyAd> => wait(adSlot, request.slug)

const loadScreen = (request: TechnologyRequest): Promise<TechnologyScreen> =>
  Promise.all([loadTechnology(request), loadTechnologyRecommendations(request), loadAdSlot(request)]).then(
    ([page, recommendations, ad]) => ({ ...page, ad, recommendations })
  )

export { loadAdSlot, loadScreen, loadTechnology, loadTechnologyRecommendations }
