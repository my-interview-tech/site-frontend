import type { ArticleOffer } from '../../model'

export const offer: ArticleOffer = {
  benefits: [
    'Развёрнутые ответы на вопросы с IT-собеседований',
    'Задачи и лайвкодинг для закрепления',
    'Направления подготовки с отслеживанием прогресса',
  ],
  button: { action: { type: 'locally' }, text: 'Выбрать тариф' },
  cancelText: 'Отмена в любой момент',
  note: 'Продолжение этого разбора и всё направление — в подписке',
  plans: [
    { id: 'month', label: '1 мес', price: '568 ₽/мес' },
    {
      id: 'quarter',
      image: 'https://picsum.photos/id/1015/800/450',
      label: '3 мес',
      price: '480 ₽/мес',
    },
    { id: 'year', label: '1 год', price: '390 ₽/мес' },
  ],
  subtitle: 'Откройте полный доступ к подготовке',
  title: 'my-interview.tech',
}
