import type {
  FavoriteRequest,
  TaskCard,
  TaskCompany,
  TaskDifficulty,
  TaskFilters,
  TasksScreen,
} from '@tasks-list/shared/model'

const LANGUAGE_ORDER = ['javascript', 'typescript', 'react']

const DIFFICULTY_ORDER: TaskDifficulty[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const COMPANY_ORDER = ['mts', 'sber', 'detmir']

const COMPANIES: Record<string, TaskCompany> = {
  detmir: { icon: '/src/icons/icon-detmir.svg', id: 'detmir', name: 'Детский мир' },
  mts: { icon: '/src/icons/icon-mts.svg', id: 'mts', name: 'МТС' },
  sber: { icon: '/src/icons/icon-sber.svg', id: 'sber', name: 'Сбербанк' },
}

const company = (id: string): TaskCompany => COMPANIES[id] ?? { icon: '', id, name: id }

const cards: Omit<TaskCard, 'href' | 'popularity'>[] = [
  {
    addedAt: '2026-03-14T11:24:08',
    author: 'kalushko',
    companies: [company('mts'), company('sber')],
    difficulty: 2,
    id: '101',
    isAbandoned: false,
    isAvailable: true,
    isStudied: true,
    languages: ['react'],
    tags: ['Hooks', 'State'],
    tech: 'react',
    title: 'Счётчик',
  },
  {
    addedAt: '2026-02-02T09:03:41',
    author: 'mira',
    companies: [company('sber')],
    difficulty: 3,
    id: '102',
    isAbandoned: false,
    isAvailable: true,
    isStudied: false,
    languages: ['javascript'],
    tags: ['Arrays'],
    tech: 'javascript',
    title: 'Разбейте массив на группы',
  },
  {
    addedAt: '2026-01-20T16:18:02',
    author: 'nord',
    companies: [company('detmir')],
    difficulty: 5,
    id: '103',
    isAbandoned: true,
    isAvailable: true,
    isStudied: false,
    languages: ['typescript'],
    tags: ['Arrays', 'Generics'],
    tech: 'typescript',
    title: 'Сгруппируйте элементы по ключу',
  },
  {
    addedAt: '2025-11-08T21:47:33',
    author: 'lens',
    companies: [company('mts')],
    difficulty: 6,
    id: '104',
    isAbandoned: false,
    isAvailable: true,
    isStudied: true,
    languages: ['javascript', 'typescript'],
    tags: ['Hooks', 'Caching', 'Async'],
    tech: 'javascript',
    title: 'Реализуйте кастомный хук для получения данных с кэшированием',
  },
  {
    addedAt: '2025-09-30T14:05:19',
    author: 'kira',
    companies: [company('sber'), company('detmir')],
    difficulty: 7,
    id: '105',
    isAbandoned: true,
    isAvailable: true,
    isStudied: false,
    languages: ['javascript'],
    tags: ['Routing'],
    tech: 'javascript',
    title: 'Настройте динамические маршруты с несколькими параметрами',
  },
  {
    addedAt: '2025-07-16T08:12:55',
    author: 'otto',
    companies: [company('mts')],
    difficulty: 8,
    id: '106',
    isAbandoned: false,
    isAvailable: true,
    isStudied: false,
    languages: ['javascript'],
    tags: ['Caching', 'SSR'],
    tech: 'javascript',
    title: 'Реализуйте инвалидацию кэша с помощью revalidatePath',
  },
  {
    addedAt: '2025-05-04T19:36:07',
    author: 'vera',
    companies: [company('sber')],
    difficulty: 9,
    id: '107',
    isAbandoned: true,
    isAvailable: false,
    isStudied: false,
    languages: ['javascript', 'typescript'],
    tags: ['Recursion', 'Objects'],
    tech: 'typescript',
    title: 'Сравните два объекта глубоко',
  },
  {
    addedAt: '2025-03-22T12:58:44',
    author: 'nox',
    companies: [company('detmir')],
    difficulty: 10,
    id: '108',
    isAbandoned: false,
    isAvailable: false,
    isStudied: false,
    languages: ['typescript'],
    tags: ['Patterns', 'Classes', 'Async'],
    tech: 'typescript',
    title: 'Реализуйте типизированный EventEmitter',
  },
]

const unique = (values: string[]): string[] => [...new Set(values)]

const filtersOf = (items: TaskCard[]): TaskFilters => {
  const languages = new Set(items.flatMap((item) => item.languages))
  const difficulties = new Set(items.map((item) => item.difficulty))
  const companies = new Map(items.flatMap((item) => item.companies.map((itemCompany) => [itemCompany.id, itemCompany])))

  return {
    companies: COMPANY_ORDER.flatMap((id) => {
      const item = companies.get(id)

      return item ? [item] : []
    }),
    difficulties: DIFFICULTY_ORDER.filter((difficulty) => difficulties.has(difficulty)),
    languages: LANGUAGE_ORDER.filter((language) => languages.has(language)),
    tags: unique(items.flatMap((item) => item.tags)),
  }
}

const POPULARITY: Record<string, number> = {
  '101': 240,
  '102': 180,
  '103': 120,
  '104': 210,
  '105': 150,
  '106': 90,
  '107': 64,
  '108': 40,
}

const catalog = (): TasksScreen => {
  const items = cards.map((card) => ({
    ...card,
    href: `/topics/${card.tech}/tasks/${card.id}`,
    popularity: POPULARITY[card.id] ?? 0,
  }))

  return {
    filters: filtersOf(items),
    items,
  }
}

const LOAD_MS = 400

const favorites = new Set<string>(['101'])

const loadTasks = (): Promise<TasksScreen> =>
  new Promise((resolve) => {
    globalThis.setTimeout(() => {
      resolve(catalog())
    }, LOAD_MS)
  })

const loadFavorites = (): Promise<string[]> =>
  new Promise((resolve) => {
    globalThis.setTimeout(() => {
      resolve([...favorites])
    }, LOAD_MS)
  })

const saveFavorite = ({ id }: FavoriteRequest): Promise<void> =>
  new Promise((resolve) => {
    globalThis.setTimeout(() => {
      favorites.add(id)
      resolve()
    }, 120)
  })

const removeFavorite = ({ id }: FavoriteRequest): Promise<void> =>
  new Promise((resolve) => {
    globalThis.setTimeout(() => {
      favorites.delete(id)
      resolve()
    }, 120)
  })

export { loadFavorites, loadTasks, removeFavorite, saveFavorite }
