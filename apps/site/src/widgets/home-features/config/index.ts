import type { Feature } from '../types'

export const TEXT = {
  TITLE: 'Как устроена подготовка',
} as const

export const FEATURES: Feature[] = [
  {
    badge: 'ТЕОРИЯ',
    title: 'банк вопросов с настоящих собеседований',
    body: '1 200+ вопросов по направлениям с эталонными ответами. Подробный разбор темы с критериями оценки и типичными ошибками.',
    image: 'images/feature-theory.png',
    imageAlt: 'Банк вопросов',
    imageFirst: true,
  },
  {
    badge: 'ПРАКТИКА',
    title: 'ПЛАТФОРМА ДЛЯ ЛАЙВКОДИНГА И КВИЗОВ',
    body: 'Песочница для тренировки решения типовых и архитектурных задач. Квизы на глубокое понимание теории.',
    image: 'images/feature-practice.png',
    imageAlt: 'Лайвкодинг и квизы',
    imageFirst: false,
  },
  {
    badge: 'АНАЛИЗ ПРОБЕЛОВ',
    title: 'Карта компетенций',
    body: 'Сервис помогает найти пробелы в теории по грейдам Junior, Middle, Senior. Предоставляет структурированный трек для подготовки к техническому интервью.',
    image: 'images/feature-gaps.png',
    imageAlt: 'Карта компетенций',
    imageFirst: true,
  },
  {
    badge: 'ТРЕНАЖЕР СОБЕСОВ',
    title: 'Технические мок-интервью',
    body: 'Симуляция реального собеседования в стресс-режиме: тайминг, аудио/текстовый формат и развернутый фидбек по сильным и слабым сторонам.',
    image: 'images/feature-mock.png',
    imageAlt: 'Мок-интервью',
    imageFirst: false,
  },
]
