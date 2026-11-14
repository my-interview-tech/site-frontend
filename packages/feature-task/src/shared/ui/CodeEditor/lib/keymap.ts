import { acceptCompletion } from '@codemirror/autocomplete'
import { indentWithTab } from '@codemirror/commands'
import { Compartment, Prec, type Extension } from '@codemirror/state'
import { keymap, type KeyBinding } from '@codemirror/view'

/**
 * Tab в коде: принять подсказку, если список открыт, иначе отступ. Shift-Tab убирает отступ.
 * Выйти из редактора с клавиатуры — Esc, затем Tab.
 */
export const editingKeymap: Extension = [
  Prec.highest(keymap.of([{ key: 'Tab', run: acceptCompletion }])),
  keymap.of([indentWithTab]),
]

/**
 * Клавиши хоста поверх встроенных: `defaultKeymap` занимает `Mod-Enter` под перенос строки.
 * Обработчик читается из ref, поэтому новые замыкания не пересоздают редактор.
 */
export const bindingsExtension = (compartment: Compartment, current: () => readonly KeyBinding[] | undefined) => {
  const build = () =>
    Prec.highest(
      keymap.of(
        (current() ?? []).map(
          (binding, index): KeyBinding => ({
            ...binding,
            run: (view) => current()?.[index]?.run?.(view) ?? false,
            shift: binding.shift ? (view) => current()?.[index]?.shift?.(view) ?? false : undefined,
          })
        )
      )
    )

  return { build, initial: compartment.of(build()) }
}

export const bindingsSignature = (bindings: readonly KeyBinding[] | undefined) =>
  (bindings ?? []).map(({ key, mac, shift }) => `${key ?? ''}|${mac ?? ''}|${shift ? 'shift' : ''}`).join(',')
