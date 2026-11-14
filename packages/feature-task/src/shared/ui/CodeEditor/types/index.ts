import type { Completion } from '@codemirror/autocomplete'
import type { Extension } from '@codemirror/state'
import type { KeyBinding } from '@codemirror/view'

import type { CodePosition, RunErrorKind } from '@task/shared/model'

/** Ошибка в коде, которую нужно отметить в редакторе. */
export type CodeEditorDiagnostic = CodePosition & {
  /**
   * `syntax` — место уточняет разбор CodeMirror, `runtime` — место из стека как есть.
   * @default `syntax`
   */
  readonly kind?: RunErrorKind

  /** Текст подсказки у отметки. */
  readonly message: string
}

/** Диапазон текста: смещения от начала документа. */
export type CodeRange = {
  readonly from: number
  readonly to: number
}

/** Редактор кода на CodeMirror. */
export interface CodeEditorProps {
  /**
   * Фокус в редактор после монтирования.
   * @default `false`
   */
  readonly autoFocus?: boolean

  /**
   * Подсказки автодополнения сверх встроенных, например имена из условия.
   */
  readonly completions?: readonly Completion[]

  /**
   * Ошибка из прогона. Пока она задана, отмечается она, а не разбор при наборе.
   */
  readonly diagnostic?: CodeEditorDiagnostic

  /**
   * Почему упал тест. Имеет смысл вместе с `caseState: 'failed'` в режиме чтения.
   */
  readonly caseMessage?: string

  /**
   * Отметка на строках `describe` и `it` в режиме чтения.
   */
  readonly caseState?: 'failed' | 'passed' | 'running'

  /**
   * Свои расширения CodeMirror. Пересоздают редактор при смене ссылки — передавайте стабильное значение.
   */
  readonly extensions?: Extension

  /**
   * Растянуть на высоту родителя. Родитель задаёт высоту сам.
   * @default `false`
   */
  readonly fill?: boolean

  /**
   * Ненулевое значение ставит фокус в редактор. Смена числа фокусирует снова, вью не пересоздаётся.
   */
  readonly focusNonce?: number

  /**
   * Клавиши поверх встроенных, например `Mod-Enter`. Перекрывают `defaultKeymap`.
   */
  readonly keyBindings?: readonly KeyBinding[]

  /** Подпись для скринридера. */
  readonly label: string

  /** Язык подсветки: `javascript`, `typescript`, `react`. */
  readonly language: string

  /**
   * ESLint для `javascript` и `react`. TypeScript не проверяется.
   * @default `true`
   */
  readonly lint?: boolean

  /** Новый текст после правки. */
  readonly onChange?: (value: string) => void

  /** Текст в пустом редакторе. */
  readonly placeholder?: string

  /**
   * Только чтение: без гаттера, курсора, подсветки строки и проверки синтаксиса.
   * @default `false`
   */
  readonly readOnly?: boolean

  /**
   * Диапазоны стартового текста, которые нельзя править, например сигнатура функции.
   */
  readonly readOnlyRanges?: readonly CodeRange[]

  /** Текст. */
  readonly value: string
}
