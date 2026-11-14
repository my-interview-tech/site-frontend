/**
 * Параметры загрузки статьи.
 */
interface ArticleRequest {
  /**
   * Идентификатор статьи.
   */
  id: string

  /**
   * Слаг технологии.
   */
  tech: string
}

/**
 * Рекламный слот в колонке статьи.
 */
interface ArticleAd {
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
 * Основной контент статьи.
 */
interface ArticleBody {
  /**
   * Тело в CommonMark. Якорь заголовка — суффикс `{#id}` в конце строки.
   * @example `## Зачем нужен DOCTYPE? {#why}`
   */
  markdown: string

  /**
   * Карточки дополнительных материалов.
   */
  resources?: ArticleResource[]

  /**
   * Следующая статья.
   */
  nextStep?: ArticleNeighbor | null

  /**
   * Предыдущая статья.
   */
  previousStep?: ArticleNeighbor | null
}

/**
 * Связь статьи с собеседованием.
 */
interface ArticleInterview {
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
 * Вывод после изучения статьи.
 */
interface ArticleResult {
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
 * Раскрывающийся контент: зачем вопрос и что даёт ответ.
 */
interface ArticleContext {
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
  interview: ArticleInterview

  /**
   * Отображение Accordion или Cell.
   * @default `false`
   */
  isAvailable: boolean

  /**
   * Вывод после изучения статьи.
   */
  result?: ArticleResult
}

/**
 * Подписка на канал в карточке навыка.
 */
interface ArticleSubscribe {
  /**
   * Подпись ссылки.
   * @example `frontend в Telegram`
   */
  label: string

  /**
   * Адрес канала.
   * @example `https://t.me/frontend`
   */
  href: string
}

/**
 * Карточка навыка.
 */
interface ArticleMetaData {
  /**
   * Значение сложности.
   * @example `2`
   */
  complexity?: string

  /**
   * Значение важности.
   * @example `1`
   */
  importance?: string

  /**
   * Ключевые слова карточки.
   * @example `['#attribute', '#doctype']`
   */
  keywords?: string[]

  /**
   * Направления подготовки.
   * @example `['frontend']`
   */
  skill?: string[]

  /**
   * Подпись кнопки навыка, заголовок шторки и секции.
   * @example `Навыки`
   */
  skillLabel: string

  /**
   * Подписка на канал.
   * @example `{ href: 'https://t.me/frontend', label: 'frontend в Telegram' }`
   */
  subscribe?: ArticleSubscribe

  /**
   * Подпись технологии.
   * @example `HTML`
   */
  tech?: string
}

/**
 * Карточка в карусели материалов.
 */
interface ArticleResource {
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
 * Пагинация соседних статей.
 */
interface ArticleNeighbor {
  /**
   * Идентификатор соседней статьи.
   */
  id: string

  /**
   * Заголовок соседней статьи.
   */
  title: string

  /**
   * Адрес соседней статьи.
   */
  href: string
}

/**
 * Пункт оглавления.
 */
interface ArticleTocItem {
  /**
   * Якорь раздела.
   */
  id: string

  /**
   * Текст пункта.
   */
  label: string
}

/** Доступ к статье. При `subscription` в `content.markdown` приходит только открытая часть. */
type ArticleAccess = 'open' | 'subscription'

type ArticleOfferActionType = 'browser' | 'locally'

/**
 * Действие кнопки перехода к тарифу.
 */
interface ArticleOfferAction {
  /**
   * `locally` — путь собирает фронт из идентификатора периода.
   * `browser` — путь приходит в `link`.
   */
  type: ArticleOfferActionType

  /**
   * Путь к странице тарифа.
   */
  link?: string
}

/**
 * Кнопка перехода к тарифу.
 */
interface ArticleOfferButton {
  /**
   * Действие кнопки.
   */
  action: ArticleOfferAction

  /**
   * Текст кнопки.
   */
  text: string
}

/**
 * Период оплаты.
 */
interface ArticleOfferPlan {
  /**
   * Идентификатор периода.
   */
  id: string

  /**
   * Фоновое изображение периода.
   */
  image?: string

  /**
   * Подпись чипа.
   */
  label: string

  /**
   * Цена периода.
   */
  price: string
}

/**
 * Блок оплаты закрытой статьи.
 */
interface ArticleOffer {
  /**
   * Название продукта.
   */
  title: string

  /**
   * Подзаголовок продукта.
   */
  subtitle: string

  /**
   * Выгоды подписки.
   */
  benefits: string[]

  /**
   * Периоды оплаты.
   */
  plans: ArticleOfferPlan[]

  /**
   * Сноска под списком.
   */
  note: string

  /**
   * Кнопка перехода к тарифу.
   */
  button: ArticleOfferButton

  /**
   * Текст условия отмены.
   */
  cancelText: string
}

/**
 * Тон бейджа. Цвета задаёт компонент `Badge`.
 */
type ArticleBadgeVariant = 'accent' | 'question' | 'quiz' | 'task'

/**
 * Бейдж шапки.
 */
interface ArticleBadge {
  /**
   * Подпись.
   * @example `По подписке`
   */
  label: string

  /**
   * Тон плашки.
   */
  variant: ArticleBadgeVariant
}

interface ArticleBase {
  /**
   * Идентификатор статьи.
   */
  id: string

  /**
   * Заголовок статьи.
   */
  title: string

  /**
   * Бейдж шапки.
   */
  badge?: ArticleBadge

  /**
   * Контент аккордеона.
   */
  accordion: ArticleContext

  /**
   * Заголовок оглавления.
   */
  tocLabel: string

  /**
   * Пункты оглавления.
   */
  toc: ArticleTocItem[]

  /**
   * Карточка с дополнительной информацией.
   */
  meta: ArticleMetaData

  /**
   * Рекламный слот.
   */
  ad?: ArticleAd

  /**
   * Контент статьи.
   */
  content: ArticleBody
}

type Article =
  | (ArticleBase & {
      /**
       * Открыта всем.
       */
      access: 'open'
    })
  | (ArticleBase & {
      /**
       * Закрыта подпиской.
       */
      access: 'subscription'

      /**
       * Блок оплаты.
       */
      offer: ArticleOffer
    })

export type {
  Article,
  ArticleAccess,
  ArticleAd,
  ArticleBadge,
  ArticleBadgeVariant,
  ArticleBody,
  ArticleContext,
  ArticleInterview,
  ArticleMetaData,
  ArticleNeighbor,
  ArticleOffer,
  ArticleOfferAction,
  ArticleOfferActionType,
  ArticleOfferButton,
  ArticleOfferPlan,
  ArticleRequest,
  ArticleResource,
  ArticleResult,
  ArticleSubscribe,
  ArticleTocItem,
}
