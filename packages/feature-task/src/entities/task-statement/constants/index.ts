export const COMPANIES = [
  { iconSrc: 'icon-mts', name: 'МТС' },
  { iconSrc: 'icon-sber', name: 'Сбербанк' },
  { iconSrc: 'icon-detmir', name: 'Детский мир' },
] as const

export const TEXT = {
  ALL_TASKS: 'Все задачи',
  DESCRIPTION: 'Описание',
  EXPECTED: 'Expected',
  HIDDEN_HINT: 'проверяются только при «Сдать»',
  PANES: 'Разделы условия',
  RECEIVED: 'Received',
  COMPLEXITY: 'Сложность',
  IMPORTANCE: 'Важность',
  SKILLS: 'Навыки',
  TESTING: 'Тестирование',
} as const

/** Делений на шкале важности и сложности. */
export const SCALE = 5

export const SUITE_LABEL = {
  failed: 'Не пройден',
  idle: 'Не запускался',
  passed: 'Пройден',
  running: 'Выполняется',
} as const

export const HIDDEN_TEST_FORMS = ['скрытый тест', 'скрытых теста', 'скрытых тестов'] as const
