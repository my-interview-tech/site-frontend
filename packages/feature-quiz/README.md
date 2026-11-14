# @my-interview/feature-quiz

Экран одного квиза. Сам загружает документ и показывает скелетон, ошибку или форму.

Импорт только из `@my-interview/feature-quiz`. Слайсы пакета снаружи недоступны.

## Публичный API

- `QuizView` — экран. Пропсы: `id`, `tech`, `nav`, `onBack`, `onSolved`.
- `QuizViewProps` — тип пропсов.
- `Quiz`, `QuizRequest` — документ без ключа ответов и ключ загрузки.

## Запуск

```bash
yarn dev:quiz
```

Превью на порту 3005, старт `/topics/react/quizzes/4`.

## Документация

- [Контракт документа](docs/contract.md)
- [Системная аналитика](docs/system-analysis.md)
