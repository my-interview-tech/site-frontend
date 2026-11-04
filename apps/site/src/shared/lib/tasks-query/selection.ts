import type { TaskSelection } from '@my-interview/feature-tasks-list'

type TaskDifficulty = TaskSelection['difficulties'][number]
type TaskSort = TaskSelection['sort']
type SortOrder = TaskSelection['order']
type TaskStatusFilter = TaskSelection['status']

const KEYS = {
  COMPANY: 'company',
  DIFFICULTY: 'difficulty',
  LANGUAGE: 'lang',
  PREMIUM: 'premium',
  QUERY: 'q',
  SORT: 'sort',
  SORT_ORDER: 'order',
  STATUS: 'status',
  TAG: 'tag',
} as const

const SORTS: readonly TaskSort[] = ['date', 'default', 'difficulty', 'popularity']

const ORDERS: readonly SortOrder[] = ['asc', 'desc']

const DIFFICULTIES: readonly TaskDifficulty[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const STATUSES: readonly TaskStatusFilter[] = ['all', 'solved', 'unsolved']

const listOf = (params: URLSearchParams, key: string): string[] =>
  (params.get(key) ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)

const isDifficulty = (value: string): value is `${TaskDifficulty}` =>
  DIFFICULTIES.some((level) => String(level) === value)

const isStatus = (value: string | null): value is TaskStatusFilter =>
  value !== null && (STATUSES as readonly string[]).includes(value)

const isSort = (value: string | null): value is TaskSort =>
  value !== null && (SORTS as readonly string[]).includes(value)

const isOrder = (value: string | null): value is SortOrder =>
  value !== null && (ORDERS as readonly string[]).includes(value)

/**
 * Выбор фильтров из query-строки. Неизвестные значения отбрасываются.
 * @example `?difficulty=2,8&lang=react&tag=hooks&status=solved&company=mts&q=счётчик&sort=difficulty`
 */
export const parseSelection = (params: URLSearchParams): TaskSelection => {
  const status = params.get(KEYS.STATUS)
  const sort = params.get(KEYS.SORT)
  const order = params.get(KEYS.SORT_ORDER)

  return {
    companies: listOf(params, KEYS.COMPANY),
    difficulties: listOf(params, KEYS.DIFFICULTY)
      .filter(isDifficulty)
      .map((level) => Number(level) as TaskDifficulty),
    languages: listOf(params, KEYS.LANGUAGE),
    order: isOrder(order) ? order : 'asc',
    premium: params.get(KEYS.PREMIUM) === '1',
    query: params.get(KEYS.QUERY) ?? '',
    sort: isSort(sort) ? sort : 'default',
    status: isStatus(status) ? status : 'all',
    tags: listOf(params, KEYS.TAG),
  }
}

/**
 * Выбор фильтров в query-строку. Пустые группы и статус `all` не пишутся.
 */
export const serializeSelection = ({
  companies,
  difficulties,
  languages,
  order,
  premium,
  query,
  sort,
  status,
  tags,
}: TaskSelection): URLSearchParams => {
  const params = new URLSearchParams()
  const groups: [string, readonly string[]][] = [
    [KEYS.COMPANY, companies],
    [KEYS.DIFFICULTY, difficulties.map(String)],
    [KEYS.LANGUAGE, languages],
    [KEYS.TAG, tags],
  ]

  groups.forEach(([key, values]) => {
    if (values.length > 0) {
      params.set(key, values.join(','))
    }
  })

  const needle = query.trim()

  if (needle) {
    params.set(KEYS.QUERY, needle)
  }

  if (sort !== 'default') {
    params.set(KEYS.SORT, sort)
  }

  if (status !== 'all') {
    params.set(KEYS.STATUS, status)
  }

  if (premium) {
    params.set(KEYS.PREMIUM, '1')
  }

  if (order !== 'asc') {
    params.set(KEYS.SORT_ORDER, order)
  }

  return params
}
