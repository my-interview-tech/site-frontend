/**
 * Параметры загрузки технологии.
 */
interface TechnologyRequest {
  /**
   * Слаг технологии.
   * @example `react`
   */
  slug: string
}

/**
 * Тип материала в списке. Задаёт подпись и цвет метки.
 */
type TechnologyItemKind = 'article' | 'question' | 'quiz' | 'task'

/**
 * Тон бейджа. Цвета задаёт компонент `Badge`.
 */
type TechnologyBadgeVariant = 'accent' | 'question' | 'quiz' | 'task'

/**
 * Бейдж шапки.
 */
interface TechnologyBadge {
  /**
   * Подпись.
   * @example `12 вопросов`
   */
  label: string

  /**
   * Тон плашки.
   */
  variant: TechnologyBadgeVariant
}

/**
 * Связь технологии с собеседованием.
 */
interface TechnologyInterview {
  /**
   * Заголовок.
   */
  title: string

  /**
   * Подпись.
   */
  label: string

  /**
   * Тело описания.
   */
  body?: string
}

/**
 * Вывод после изучения технологии.
 */
interface TechnologyResult {
  /**
   * Подпись.
   */
  label: string

  /**
   * Пункты.
   */
  items: string[]
}

/**
 * Раскрывающийся контент: зачем технология и что даёт изучение.
 */
interface TechnologyContext {
  /**
   * Заголовок.
   */
  title: string

  /**
   * Подпись под заголовком.
   */
  caption?: string

  /**
   * Ссылка на иконку.
   */
  imageSrc: string

  /**
   * Связь с собеседованием.
   */
  interview: TechnologyInterview

  /**
   * Отображение Accordion или Cell.
   * @default `false`
   */
  isAvailable: boolean

  /**
   * Вывод после изучения технологии.
   */
  result?: TechnologyResult

  /**
   * Бейджи справа в шапке. До 768px скрыты.
   */
  badges: TechnologyBadge[]
}

/**
 * Материал в секции.
 */
interface TechnologyItem {
  /**
   * Сколько раз материал добавили в закладки.
   */
  bookmarkCount?: number

  /**
   * Адрес материала. У закрытого приходит, но ссылкой не показывается.
   * @example `/topics/react/tasks/react-task`
   */
  href: string

  /**
   * Идентификатор материала.
   */
  id: string

  /**
   * Порядковый номер в секции.
   */
  index: number

  /**
   * Материал открыт. Закрытый показывается замком и без ссылки.
   */
  isAvailable: boolean

  /**
   * Материал изучен.
   */
  isStudied: boolean

  /**
   * Тип материала.
   */
  kind: TechnologyItemKind

  /**
   * Заголовок материала.
   */
  title: string
}

type TechnologyUpgradeActionType = 'browser' | 'locally'

/**
 * Действие кнопки перехода к тарифу.
 */
interface TechnologyUpgradeAction {
  /**
   * `locally` — путь собирает фронт.
   * `browser` — путь приходит в `link`.
   */
  type: TechnologyUpgradeActionType

  /**
   * Путь к странице тарифа.
   */
  link?: string
}

/**
 * Баннер подписки внутри секции.
 */
interface TechnologyUpgrade {
  /**
   * Действие кнопки.
   * @example `{ type: 'locally' }`
   */
  action: TechnologyUpgradeAction

  /**
   * Баннер встаёт после материала с этим `id`.
   */
  afterItemId: string

  /**
   * Текст кнопки.
   */
  cta: string

  /**
   * Пояснение под заголовком.
   */
  description: string

  /**
   * Заголовок баннера.
   */
  title: string
}

/**
 * Группа секций. В оглавлении её заголовок не кликабелен, секции внутри — пункты.
 */
interface TechnologySectionGroup {
  /**
   * Якорь группы.
   */
  anchor: string

  /**
   * Заголовок группы.
   */
  title: string
}

/**
 * Секция списка материалов.
 */
interface TechnologySection {
  /**
   * Якорь секции для оглавления.
   */
  anchor: string

  /**
   * Группа, в которую входит секция. Нет, если секция сама верхний уровень.
   */
  group?: TechnologySectionGroup

  /**
   * Идентификатор секции.
   */
  id: string

  /**
   * Материалы секции по порядку.
   */
  items: TechnologyItem[]

  /**
   * Заголовок секции.
   */
  title: string

  /**
   * Баннер подписки. Без него секция идёт без вставки.
   */
  upgrade?: TechnologyUpgrade
}

/**
 * Карточка в карусели материалов.
 */
interface TechnologyResource {
  /**
   * Идентификатор карточки.
   */
  id: string

  /**
   * Заголовок карточки.
   */
  title: string

  /**
   * URL фонового изображения.
   */
  image: string

  /**
   * Путь к материалу.
   */
  href: string
}

/**
 * Пункт оглавления.
 */
interface TechnologyTocItem {
  /**
   * Якорь блока на странице.
   */
  id: string

  /**
   * Текст пункта.
   */
  label: string
}

/**
 * Рекомендованная технология.
 */
interface TechnologyRecommendation {
  /**
   * Текст ссылки.
   */
  cta: string

  /**
   * Адрес страницы технологии.
   * @example `/topics/typescript`
   */
  href: string

  /**
   * Ссылка на иконку.
   */
  icon: string

  /**
   * Прогресс изучения, 0–100.
   */
  progress: number

  /**
   * Всего вопросов.
   */
  questionCount: number

  /**
   * Слаг технологии.
   */
  slug: string

  /**
   * Изучено вопросов.
   */
  studiedCount: number

  /**
   * Название технологии.
   */
  title: string
}

/**
 * Блок рекомендаций в колонке и шторке.
 */
interface TechnologyRecommendations {
  /**
   * Надзаголовок блока и заголовок шторки.
   * @example `Сначала изучите`
   */
  label: string

  /**
   * Рекомендация для колонки и шторки.
   */
  item: TechnologyRecommendation
}

/**
 * Рекламный слот в колонке.
 */
interface TechnologyAd {
  /**
   * Подпись слота.
   */
  label: string

  /**
   * Размер слота, например `240 × 400`.
   * TODO: добавить типы размеров 's', 'm', 'l', 'xl'.
   */
  size: string
}

/**
 * Всё, что экран технологии загружает по слагу.
 */
interface TechnologyScreen {
  /**
   * Рекламный слот.
   */
  ad?: TechnologyAd

  /**
   * Контент аккордеона.
   */
  accordion: TechnologyContext

  /**
   * Карточки полезных материалов.
   */
  resources: TechnologyResource[]

  /**
   * Секции материалов.
   */
  sections: TechnologySection[]

  /**
   * Слаг технологии.
   */
  slug: string

  /**
   * Название технологии.
   */
  title: string

  /**
   * Пункты оглавления.
   */
  toc: TechnologyTocItem[]

  /**
   * Заголовок оглавления.
   * @example `На этой странице`
   */
  tocLabel: string

  /**
   * Рекомендации для колонки и шторки. Нет, если других технологий для перехода нет.
   */
  recommendations?: TechnologyRecommendations
}

export type {
  TechnologyAd,
  TechnologyBadge,
  TechnologyBadgeVariant,
  TechnologyContext,
  TechnologyInterview,
  TechnologyItem,
  TechnologyItemKind,
  TechnologyRecommendation,
  TechnologyRecommendations,
  TechnologyRequest,
  TechnologyResource,
  TechnologyResult,
  TechnologyScreen,
  TechnologySection,
  TechnologySectionGroup,
  TechnologyTocItem,
  TechnologyUpgrade,
  TechnologyUpgradeAction,
  TechnologyUpgradeActionType,
}
