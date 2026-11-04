import type { FaqGroup } from '../types'

export const TEXT = {
  HINT: 'Не нашли свой вопрос — напишите в поддержку, отвечаем в течение дня.',
  TITLE: 'Частые вопросы',
} as const

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: 'service',
    title: 'О работе сервиса',
    items: [
      { id: 'free', question: 'Это бесплатно?' },
      { id: 'grade', question: 'Подойдёт джуну или это только для сеньоров?' },
      {
        id: 'source',
        question: 'Откуда берутся вопросы',
        answer:
          'Из реальных собеседований: их присылают кандидаты после интервью, а мы проверяем, редактируем и сортируем по частоте. Поэтому наверху всегда то, что спрашивают чаще всего, а не то, что интереснее автору.',
      },
      { id: 'mock', question: 'Что такое mock-interview?' },
      { id: 'app', question: 'Нужно ли ставить приложение?' },
      { id: 'progress', question: 'Как считается прогресс?' },
    ],
  },
  { id: 'pricing', title: 'Тарифы', items: [] },
  { id: 'discount', title: 'Скидка', items: [] },
  { id: 'contacts', title: 'Контакты', items: [] },
]
