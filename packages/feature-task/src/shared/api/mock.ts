import type {
  RunOptions,
  RunReport,
  RunTest,
  SubmitInput,
  Task,
  TaskRequest,
  TaskSkill,
  TaskTest,
} from '@task/shared/model'

import { titlesOf } from '@task/shared/lib'

import { runTask, type RunTaskOptions } from './runTask'

/**
 * Тест в хранилище: название можно не писать — его соберёт `titleOf` из `describe` и `it`.
 */
type StoredTest = Omit<TaskTest, 'title'> & {
  readonly title?: string
}

/**
 * Задача целиком, как её хранит проверка: со скрытыми тестами.
 */
type StoredTask = Omit<Task, 'hiddenCount' | 'tests'> & {
  readonly hiddenTests: readonly StoredTest[]
  readonly tests: readonly StoredTest[]
}

const titled = (test: StoredTest, index = 0, tests: readonly StoredTest[] = [test]): TaskTest => {
  const titles = titlesOf(test.code)
  const offset = tests.slice(0, index).filter((item) => item.code === test.code).length
  const derived = titles.length > 1 ? titles[offset] : titles[0]

  return {
    ...test,
    title: derived ?? test.title ?? test.id,
  }
}

const expectOf = (body: string, items: readonly string[]) => ({
  interview: {
    body,
    label: 'Связь с интервью',
    title: 'Что от вас ждут',
  },
  outcome: {
    items,
    label: 'После решения вы сможете',
  },
})

const skillOf = (keywords: readonly string[], importance = '2', complexity = '1'): TaskSkill => ({
  complexity,
  importance,
  keywords,
  skill: ['frontend'],
  skillLabel: 'Навыки',
  subscribe: { href: 'https://t.me/frontend', label: 'frontend в Telegram' },
})

const taskTitles: Record<string, string> = {
  'javascript/104': 'Реализуйте кастомный хук для получения данных с кэшированием',
  'javascript/105': 'Настройте динамические маршруты с несколькими параметрами',
  'javascript/106': 'Реализуйте инвалидацию кэша с помощью revalidatePath',
  'nextjs/13': 'Реализуйте инвалидацию кэша с помощью revalidatePath',
  'nextjs/15': 'Продвинутый: оптимизация запросов с React cache() и Suspense',
  'nextjs/3': 'Реализуйте кастомный хук для получения данных с кэшированием',
  'nextjs/5': 'Продвинутый: потоковый SSR с Suspense boundaries',
  'nextjs/8': 'Настройте динамические маршруты с несколькими параметрами',
}

const chunkTask: StoredTask = {
  id: '102',
  tech: 'javascript',
  language: 'javascript',
  title: 'Разбейте массив на группы',
  lead: 'Чистая функция. Тесты вызывает площадка, решение экспортируйте как chunk.',
  statement: [
    'Напишите chunk(list, size). Функция делит массив на группы длины size. Последняя группа может быть короче.',
    'Пустой список возвращает пустой массив. Размер больше длины списка оставляет одну группу.',
  ],
  hints: ['chunk', 'list', 'size'],
  ...expectOf('Проверяют, делите ли вы массив на группы заданной длины и не теряете ли короткий хвост.', [
    'Делить массив на равные группы',
    'Оставлять хвост отдельной группой',
    'Возвращать пустой массив для пустого списка',
  ]),
  skill: skillOf(['#javascript', '#array']),
  starter: `export function chunk(list, size) {
  return [list.slice(0, size)]
}
`,
  tests: [
    {
      id: 'even',
      code: `describe('chunk', () => {
  it('делит массив поровну', () => {
    expect(solution.chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]])
  })
})`,
    },
    {
      id: 'tail',
      code: `describe('chunk', () => {
  it('оставляет хвост отдельной группой', () => {
    expect(solution.chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
  })
})`,
    },
    {
      id: 'empty',
      code: `describe('chunk', () => {
  it('пустой список', () => {
    expect(solution.chunk([], 2)).toEqual([])
  })
})`,
    },
  ],
  hiddenTests: [],
}

const groupByTask: StoredTask = {
  id: '103',
  tech: 'typescript',
  language: 'typescript',
  title: 'Сгруппируйте элементы по ключу',
  lead: 'TypeScript. Типы стираются перед запуском и сами по себе тесты не валят.',
  statement: [
    'Напишите groupBy(items, key). Функция собирает объекты в словарь по значению поля key.',
    'Ключ в результате — строка. Порядок элементов внутри группы сохраняйте.',
  ],
  hints: ['groupBy', 'items', 'key'],
  ...expectOf('Проверяют, собираете ли вы объекты в словарь по полю и сохраняете ли порядок внутри группы.', [
    'Группировать объекты по значению ключа',
    'Сохранять порядок элементов в группе',
  ]),
  skill: skillOf(['#typescript', '#groupby'], '2', '2'),
  starter: `export function groupBy<T extends Record<string, unknown>>(items: readonly T[], key: keyof T): Record<string, T[]> {
  return {}
}
`,
  tests: [
    {
      id: 'types',
      title: 'Две группы по полю type',
      code: `assert.deepEqual(
  solution.groupBy(
    [
      { type: 'a', n: 1 },
      { type: 'b', n: 2 },
      { type: 'a', n: 3 },
    ],
    'type',
  ),
  {
    a: [
      { type: 'a', n: 1 },
      { type: 'a', n: 3 },
    ],
    b: [{ type: 'b', n: 2 }],
  },
)`,
    },
    {
      id: 'empty',
      title: 'Пустой список',
      code: "assert.deepEqual(solution.groupBy([], 'type'), {})",
    },
  ],
  hiddenTests: [],
}

const counterTask: StoredTask = {
  id: '101',
  tech: 'react',
  language: 'react',
  title: 'Счётчик',
  lead: 'React-компонент. React уже есть в окружении, импорт не нужен.',
  statement: [
    'Напишите компонент Counter. Кнопка показывает текущее число, начиная с нуля.',
    'Каждый клик увеличивает число на один. Состояние храните через React.useState.',
  ],
  hints: ['Counter', 'count', 'setCount'],
  ...expectOf(
    'Проверяют, умеете ли вы хранить число в состоянии и обновлять его от клика, а не подставлять событие или константу.',
    [
      'Держать счётчик в React.useState',
      'Увеличивать значение на один за клик',
      'Не ронять компонент при рендере и клике',
    ]
  ),
  skill: skillOf(['#react', '#usestate']),
  starter: `export function Counter() {
  const [count, setCount] = React.useState(0)

  return (
    <button type="button" onClick={() => setCount(count)}>
      {count}
    </button>
  )
}
`,
  tests: ['zero', 'step', 'series', 'safe'].map((id) => ({
    id,
    code: `describe('Counter', () => {
  describe('success', () => {
    it('стартует с нуля', () => {
      const { getByRole } = render(<solution.Counter />)

      expect(getByRole('button').textContent).toBe('0')
    })

    it('увеличивает на один за клик', () => {
      const { getByRole } = render(<solution.Counter />)
      const button = getByRole('button')

      fireEvent.click(button)
      expect(button.textContent).toBe('1')
      fireEvent.click(button)
      expect(button.textContent).toBe('2')
    })
  })

  describe('edge', () => {
    it('считает серию кликов', () => {
      const { getByRole } = render(<solution.Counter />)
      const button = getByRole('button')

      fireEvent.click(button)
      fireEvent.click(button)
      fireEvent.click(button)
      fireEvent.click(button)
      fireEvent.click(button)
      expect(button.textContent).toBe('5')
    })
  })

  describe('error', () => {
    it('не падает при рендере и клике', () => {
      const { getByRole } = render(<solution.Counter />)
      const button = getByRole('button')

      expect(() => fireEvent.click(button)).not.toThrow()
    })
  })
})`,
  })),
  hiddenTests: [],
}

const shortTask = (tech: string, id: string): StoredTask => ({
  id,
  tech,
  language: 'javascript',
  title: taskTitles[`${tech}/${id}`] ?? 'Короткое практическое задание',
  lead: 'Функция solve возвращает число, умноженное на два.',
  statement: ['Экспортируйте solve(value). Открытый тест проверяет solve(2).'],
  hints: ['solve', 'value'],
  ...expectOf('Проверяют, возвращает ли функция удвоенное число.', ['Удваивать переданное значение']),
  skill: skillOf([`#${tech}`]),
  starter: `export function solve(value) {
  return value
}
`,
  tests: [
    {
      id: 'double',
      title: 'Удваивает число',
      code: 'assert.equal(solution.solve(2), 4)',
    },
  ],
  hiddenTests: [],
})

const resolveTask = ({ id, tech }: TaskRequest): StoredTask => {
  if (id === '102') {
    return chunkTask
  }

  if (id === '103') {
    return groupByTask
  }

  if (id === '101') {
    return counterTask
  }

  return shortTask(tech, id)
}

const LOAD_MS = 400

/**
 * Документ задачи для клиента: скрытые тесты не уходят, только их число.
 */
const loadTask = (request: TaskRequest): Promise<Task> =>
  new Promise((resolve, reject) => {
    globalThis.setTimeout(() => {
      if (request.id === 'error') {
        reject(new Error('unavailable'))

        return
      }

      const { hiddenTests, tests, ...task } = resolveTask(request)

      resolve({ ...task, hiddenCount: hiddenTests.length, tests: tests.map(titled) })
    }, LOAD_MS)
  })

/**
 * Проверка «Сдать»: открытые и скрытые тесты. С бэкендом заменяется на запрос, контракт тот же.
 */
const submitTask = (
  input: SubmitInput,
  options: RunOptions & Pick<RunTaskOptions, 'runners'> = {}
): Promise<RunReport> => {
  const { hiddenTests, tests } = resolveTask(input)
  const all: RunTest[] = [...tests.map(titled), ...hiddenTests.map((test) => ({ ...titled(test), hidden: true }))]

  return runTask({ code: input.code, language: input.language, tests: all }, options)
}

export { loadTask, submitTask }
