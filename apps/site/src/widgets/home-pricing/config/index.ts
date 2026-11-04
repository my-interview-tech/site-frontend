import type { Plan } from '../types'

export const TEXT = {
  BADGE: 'ТАРИФЫ И УСЛОВИЯ',
  TITLE: 'Прозрачная подготовка без скрытых условий',
  LEAD: 'Начните бесплатно или откройте полный банк вопросов и индивидуальные мок-интервью',
  TRUST:
    'Отмена подписки в 1 клик в личном кабинете · Без скрытых списаний · Безопасная оплата картами РФ и зарубежными',
} as const

export const PLANS: Plan[] = [
  {
    badge: 'БЕСПЛАТНО',
    badgeTone: 'muted',
    name: 'Бесплатный старт',
    note: 'Для знакомства с платформой',
    price: '0 ₽',
    period: 'навсегда без карты',
    highlighted: false,
    cta: 'Начать бесплатно',
    features: [
      { included: true, label: '50 базовых вопросов с ответами' },
      { included: true, label: 'Запуск кода и тестов в браузере' },
      { included: true, label: 'Базовый трекер прогресса' },
      { included: false, label: 'Карта пробелов и AI-диагностика' },
      { included: false, label: 'Технические мок-интервью' },
    ],
  },
  {
    badge: 'ХИТ · ЭКОНОМИЯ 25%',
    badgeTone: 'purple',
    name: 'Полная база',
    note: 'Всё для уверенного оффера',
    price: '1 800 ₽',
    oldPrice: '2 400 ₽',
    period: 'за 3 месяца (600 ₽ / мес)',
    highlighted: true,
    cta: 'Оформить доступ',
    features: [
      { included: true, label: 'Все 1 200+ вопросов с разборами' },
      { included: true, label: 'Интерактивные задачи и тесты' },
      { included: true, label: 'Карта компетенций Junior / Middle / Senior' },
      { included: true, label: 'AI-помощник и разбор ловушек' },
      { included: true, label: 'Закрытый чат кандидатов' },
    ],
  },
  {
    badge: 'МАКСИМУМ',
    badgeTone: 'blue',
    name: 'База + Моки',
    note: 'Полная база с личной практикой',
    price: '4 990 ₽',
    period: 'разовый пакет',
    highlighted: false,
    cta: 'Выбрать с моками',
    features: [
      { included: true, label: 'Всё, что входит в «Полную базу»' },
      { included: true, label: '2 персональных мок-интервью (60 мин)' },
      { included: true, label: 'Сеньор-интервьюер из BigTech' },
      { included: true, label: 'Детальный аудит резюме и GitHub' },
      { included: true, label: 'Персональный роадмап до оффера' },
    ],
  },
]
