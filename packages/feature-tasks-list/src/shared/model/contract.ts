/**
 * Сложность задачи от 1 до 10. 1 — самая лёгкая, 10 — ультрасложная.
 */
type TaskDifficulty = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

/**
 * Компания, которая спрашивает задачу.
 */
interface TaskCompany {
  /**
   * Адрес иконки.
   */
  icon: string

  /**
   * Идентификатор компании.
   * @example `mts`
   */
  id: string

  /**
   * Название.
   * @example `МТС`
   */
  name: string
}

/**
 * Карточка задачи в списке.
 */
interface TaskCard {
  /**
   * Компании, которые спрашивают задачу.
   */
  companies: TaskCompany[]

  /**
   * Дата и время добавления в каталог, `YYYY-MM-DDTHH:mm:ss`.
   * @example `2026-03-14T11:24:08`
   */
  addedAt: string

  /**
   * Ник автора задачи.
   * @example `kalushko`
   */
  author: string

  /**
   * Сложность. Задаёт подпись и цвет ранга.
   */
  difficulty: TaskDifficulty

  /**
   * Адрес экрана задачи.
   * @example `/topics/react/tasks/react-task`
   */
  href: string

  /**
   * Идентификатор задачи. Совпадает с `id` экрана задачи.
   * @example `react-task`
   */
  id: string

  /**
   * Задача открыта. Закрытая показывается замком и без ссылки.
   */
  isAvailable: boolean

  /**
   * Пользователь бросил задачу, не решив её. Если `isStudied`, эта отметка не показывается.
   */
  isAbandoned: boolean

  /**
   * Пользователь уже решил задачу.
   */
  isStudied: boolean

  /**
   * Языки решения. Те же слаги, что `Task.language` в `@my-interview/feature-task`.
   * @example `['javascript', 'typescript']`
   */
  languages: string[]

  /**
   * Сколько раз задачу открывали. Нужно для сортировки по популярности.
   */
  popularity: number

  /**
   * Слаг технологии. Задаёт адрес экрана задачи.
   * @example `react`
   */
  tech: string

  /**
   * Темы задачи.
   * @example `['Arrays', 'Recursion']`
   */
  tags: string[]

  /**
   * Название.
   */
  title: string
}

/**
 * Значения для контролов фильтра. Выбор пользователя в документ не входит.
 */
interface TaskFilters {
  /**
   * Компании в порядке показа.
   */
  companies: TaskCompany[]

  /**
   * Уровни сложности в порядке показа.
   */
  difficulties: TaskDifficulty[]

  /**
   * Языки в порядке показа.
   */
  languages: string[]

  /**
   * Темы в порядке показа.
   */
  tags: string[]
}

/**
 * Каталог задач. Не привязан к технологии.
 */
interface TasksScreen {
  /**
   * Значения для фильтров.
   */
  filters: TaskFilters

  /**
   * Задачи каталога.
   */
  items: TaskCard[]
}

/**
 * Задача, которую добавляют в избранное или убирают из него.
 */
interface FavoriteRequest {
  /**
   * Идентификатор задачи.
   */
  id: string
}

export type { FavoriteRequest, TaskCard, TaskCompany, TaskDifficulty, TaskFilters, TasksScreen }
