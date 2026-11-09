/**
 * Параметры загрузки задачи.
 */
interface TaskRequest {
  /**
   * Идентификатор задачи.
   * @example `react-task`
   */
  readonly id: string

  /**
   * Слаг технологии.
   * @example `react`
   */
  readonly tech: string
}

/**
 * Открытый тест задачи: код, который площадка выполняет против решения.
 */
interface TaskTest {
  /**
   * Код теста. В нём доступны `solution`, `assert`, `expect`, `describe`, `it`.
   * Для React — `render`, `screen`, `fireEvent`, `act`, `within`.
   * @example `it('удваивает', () => { expect(solution.solve(2)).toBe(4) })`
   */
  readonly code: string

  /**
   * Идентификатор теста.
   */
  readonly id: string

  /**
   * Название кейса.
   */
  readonly title: string
}

/**
 * Связь задачи с собеседованием. Те же поля, что у аккордеона статьи.
 */
interface TaskInterview {
  /**
   * Тело описания.
   */
  readonly body?: string

  /**
   * Подпись над заголовком.
   * @example `Связь с интервью`
   */
  readonly label: string

  /**
   * Заголовок. Он же подпись таба.
   * @example `Что от вас ждут`
   */
  readonly title: string
}

/**
 * Что кандидат сможет после решения.
 */
interface TaskOutcome {
  /**
   * Подпись списка.
   * @example `После решения вы сможете`
   */
  readonly label: string

  /**
   * Пункты.
   */
  readonly items: readonly string[]
}

/**
 * Подписка в карточке навыка. Как в статье.
 */
interface TaskSubscribe {
  /**
   * Подпись ссылки.
   * @example `frontend в Telegram`
   */
  readonly label: string

  /**
   * Адрес канала.
   */
  readonly href: string
}

/**
 * Карточка навыка задачи. Те же поля, что у статьи.
 */
interface TaskSkill {
  /**
   * Значение сложности.
   * @example `1`
   */
  readonly complexity?: string

  /**
   * Значение важности.
   * @example `2`
   */
  readonly importance?: string

  /**
   * Ключевые слова.
   * @example `['#react', '#usestate']`
   */
  readonly keywords?: readonly string[]

  /**
   * Направления.
   * @example `['frontend']`
   */
  readonly skill: readonly string[]

  /**
   * Подпись секции.
   * @example `Навыки`
   */
  readonly skillLabel: string

  /**
   * Подписка на канал.
   */
  readonly subscribe?: TaskSubscribe
}

/**
 * Документ задачи. Скрытые тесты на клиент не приходят — только их число.
 */
interface Task {
  /**
   * Сколько скрытых тестов проверит «Сдать».
   */
  readonly hiddenCount: number

  /**
   * Имена из условия для автодополнения: сигнатура, хелперы.
   * @example `['chunk', 'list', 'size']`
   */
  readonly hints?: readonly string[]

  /**
   * Идентификатор задачи.
   */
  readonly id: string

  /**
   * Что проверяют на собеседовании. Таб в условии.
   */
  readonly interview?: TaskInterview

  /**
   * Язык решения. Задаёт подсветку и раннер.
   * @example `javascript` | `typescript` | `react`
   */
  readonly language: string

  /**
   * Подзаголовок: как устроено окружение.
   */
  readonly lead: string

  /**
   * Что кандидат сможет после решения.
   */
  readonly outcome?: TaskOutcome

  /**
   * Код в редакторе на старте.
   */
  readonly starter: string

  /**
   * Абзацы условия.
   */
  readonly statement: readonly string[]

  /**
   * Карточка навыка. Таб «Навыки» в условии.
   */
  readonly skill?: TaskSkill

  /**
   * Слаг технологии.
   */
  readonly tech: string

  /**
   * Открытые тесты: их гоняет «Запустить» и показывает условие.
   */
  readonly tests: readonly TaskTest[]

  /**
   * Заголовок задачи.
   */
  readonly title: string
}

/**
 * `sample` — «Запустить», только консоль. `submit` — «Сдать», тесты и консоль.
 */
type RunMode = 'sample' | 'submit'

/**
 * Тест в прогоне. Скрытый приходит только от `submitTask`.
 */
interface RunTest extends TaskTest {
  readonly hidden?: boolean
}

/**
 * Что уходит в раннер.
 */
interface RunInput {
  readonly code: string
  readonly language: string

  /**
   * Только консоль: модуль исполняется один раз, тесты не гоняются.
   * Для React компонент решения рендерится один раз.
   */
  readonly preview?: boolean

  readonly tests: readonly RunTest[]
}

/**
 * Что уходит в проверку «Сдать». Скрытые тесты подставляет проверка, а не клиент.
 */
interface SubmitInput {
  readonly code: string
  readonly id: string
  readonly language: string
  readonly tech: string
}

/**
 * Отмена прогона: уход со страницы или новый прогон.
 */
interface RunOptions {
  readonly signal?: AbortSignal
}

/**
 * Место в коде решения.
 */
interface CodePosition {
  /**
   * Колонка, с единицы.
   */
  readonly column: number

  /**
   * Строка, с единицы.
   */
  readonly line: number
}

/**
 * Уровень записи консоли прогона.
 */
type ConsoleLevel = 'debug' | 'error' | 'info' | 'log' | 'warn'

/**
 * Строка `console.*` из решения или теста.
 */
interface ConsoleEntry {
  /**
   * Уровень вызова.
   */
  readonly level: ConsoleLevel

  /**
   * Аргументы через пробел. Строка как есть, остальное — JSON.
   */
  readonly text: string

  /**
   * Название теста, внутри которого был вызов. Нет у вывода до тестов.
   */
  readonly title?: string
}

/**
 * Результат одного теста.
 */
interface TaskCaseResult {
  /**
   * Где в решении упало исключение. Нет у скрытого теста и у упавшей проверки `assert`.
   */
  readonly errorAt?: CodePosition

  readonly hidden: boolean
  readonly id: string

  /**
   * Почему тест упал. У скрытого теста не приходит.
   */
  readonly message?: string

  readonly passed: boolean
  readonly title: string
}

/**
 * `syntax` — решение не скомпилировалось, `runtime` — упало при выполнении модуля.
 */
type RunErrorKind = 'runtime' | 'syntax'

/**
 * Результат прогона. `error` — решение не запустилось, `cases` пустой.
 */
interface RunReport {
  readonly cases: readonly TaskCaseResult[]
  readonly error?: string

  /**
   * Вывод `console` за прогон, по порядку вызовов.
   */
  readonly logs?: readonly ConsoleEntry[]

  /**
   * Где ошибка. Приходит только вместе с `error`.
   */
  readonly errorAt?: CodePosition

  /**
   * Что за ошибка. Приходит только вместе с `error`.
   */
  readonly errorKind?: RunErrorKind
}

/**
 * Внешний раннер для языков, которые не исполняются в воркере.
 */
interface TaskRunner {
  readonly languages: readonly string[]
  run: (input: RunInput, options?: RunOptions) => Promise<RunReport>
}

export type {
  CodePosition,
  ConsoleEntry,
  ConsoleLevel,
  RunErrorKind,
  RunInput,
  RunMode,
  RunOptions,
  RunReport,
  RunTest,
  SubmitInput,
  Task,
  TaskCaseResult,
  TaskInterview,
  TaskOutcome,
  TaskSkill,
  TaskRequest,
  TaskRunner,
  TaskTest,
}
