# @my-interview/feature-roadmap

Граф дорожной карты. Трек читает из `?track=`. Адрес темы задаёт хост.

Импорт только из `@my-interview/feature-roadmap`. Слайсы пакета снаружи недоступны.

## Публичный API

- `Roadmap` — экран. Пропсы: `topicHref`, `filterEnabled`.
- `RoadmapProps` — тип пропсов.

## Запуск

```bash
yarn dev:roadmap
```

Превью на порту 3006, старт `/topics?track=frontend`.

## Документация

- [Контракт](docs/contract.md)
- [Системная аналитика](docs/system-analysis.md)
