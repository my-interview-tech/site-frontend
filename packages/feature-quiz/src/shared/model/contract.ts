/**
 * Параметры загрузки квиза.
 */
interface QuizRequest {
  /**
   * Идентификатор квиза.
   */
  id: string

  /**
   * Слаг технологии.
   */
  tech: string
}

/**
 * Время сервера в конверте BDU.
 */
interface QuizServerDate {
  /**
   * Идентификатор поля.
   */
  id: string

  /**
   * Unix-время в секундах.
   */
  value: number
}

/**
 * Вариант ответа.
 */
interface QuizOption {
  /**
   * Идентификатор варианта.
   */
  id: string

  /**
   * Текст варианта.
   */
  label: string
}

/**
 * Заголовок шага.
 */
interface QuizTitle {
  /**
   * Вид компонента.
   */
  component: 'title'

  /**
   * Идентификатор компонента.
   */
  id: string

  /**
   * Показывать заголовок.
   */
  visibility: boolean

  /**
   * Текст заголовка.
   */
  label: string
}

/**
 * Вопрос с одним верным вариантом.
 */
interface QuizChoice {
  /**
   * Вид компонента.
   */
  component: 'choice'

  /**
   * Идентификатор вопроса. Ключ поля формы.
   */
  id: string

  /**
   * Показывать вопрос.
   */
  visibility: boolean

  /**
   * Текст вопроса.
   */
  label: string

  /**
   * Варианты ответа.
   */
  options: QuizOption[]
}

/**
 * Шапка шага: подпись и доступность назад.
 */
interface QuizNavBar {
  /**
   * Вид компонента.
   */
  component: 'navBar'

  /**
   * Идентификатор компонента.
   */
  id: string

  /**
   * Подпись шага.
   * @example `Шаг 1 из 3`
   */
  label: string

  /**
   * Можно закрыть квиз.
   */
  isCloseAvailable: boolean

  /**
   * Можно вернуться на предыдущий шаг.
   */
  isStepBackAvailable: boolean
}

/**
 * Кнопка шага.
 */
interface QuizFooterButton {
  /**
   * Вид компонента.
   */
  component: 'footerButton'

  /**
   * Идентификатор компонента.
   */
  id: string

  /**
   * Тон кнопки.
   */
  type: 'primary'

  /**
   * Текст кнопки.
   */
  label: string

  /**
   * `toForm` — следующий шаг. `submit` — сдача квиза.
   */
  buttonAction: 'submit' | 'toForm'
}

/**
 * Компонент страницы квиза.
 */
type QuizComponent = QuizChoice | QuizFooterButton | QuizNavBar | QuizTitle

/**
 * Что проверяет квиз и правила попытки.
 */
interface QuizIntro {
  /**
   * Темы, которые проверяет квиз.
   */
  checks: string[]

  /**
   * Правила перед стартом.
   */
  rules: string[]
}

/**
 * Рекламный слот справа.
 */
interface QuizAd {
  /**
   * Идентификатор слота.
   */
  id: string

  /**
   * Метка слота.
   */
  label: string

  /**
   * Подпись, например размер.
   */
  caption?: string
}

/**
 * Квиз без ключа верных ответов.
 */
interface Quiz {
  /**
   * Идентификатор квиза.
   */
  id: string

  /**
   * Название квиза.
   */
  title: string

  /**
   * Название технологии для крошек.
   */
  topicTitle: string

  /**
   * Идентификатор процесса BDU.
   */
  processId: string

  /**
   * Время сервера.
   */
  serverDate: QuizServerDate

  /**
   * Шаги. Каждый шаг — набор компонентов страницы.
   */
  pages: QuizComponent[][]

  /**
   * Описание перед стартом.
   */
  intro: QuizIntro

  /**
   * Секунд на один вопрос.
   */
  questionSeconds: number

  /**
   * Unix-секунды, когда попытка снова доступна. `null` — можно начать сейчас.
   */
  retryAt: number | null

  /**
   * Реклама в правой колонке.
   */
  ad: QuizAd
}

/**
 * Загруженный квиз. Ключ ответов не входит в страницу и не рисуется на шаге.
 */
interface QuizLoad extends Quiz {
  /**
   * Верный вариант по идентификатору вопроса.
   */
  answers: Record<string, string>
}

export type {
  Quiz,
  QuizChoice,
  QuizComponent,
  QuizAd,
  QuizFooterButton,
  QuizIntro,
  QuizLoad,
  QuizNavBar,
  QuizOption,
  QuizRequest,
  QuizServerDate,
  QuizTitle,
}
