/** Формы слова для 1, 2–4 и 5+: `['вопрос', 'вопроса', 'вопросов']`. */
export type PluralForms = readonly [one: string, few: string, many: string]

/**
 * Число со словом в нужной форме: `pluralize(3, ['задача', 'задачи', 'задач'])` → `3 задачи`.
 */
export const pluralize = (count: number, [one, few, many]: PluralForms): string => {
  const mod10 = count % 10
  const mod100 = count % 100

  if (mod10 === 1 && mod100 !== 11) {
    return `${count} ${one}`
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `${count} ${few}`
  }

  return `${count} ${many}`
}
