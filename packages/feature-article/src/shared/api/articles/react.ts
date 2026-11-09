import type { Article, ArticleContext, ArticleMetaData } from '../../model'

const accordion = (caption: string): ArticleContext => ({
  caption,
  imageSrc: '/src/icons/icon-react.svg',
  interview: {
    body: 'Проверяют, можете ли вы объяснить хук на функциональном компоненте и не перепутать его с классовым API.',
    label: 'Связь с интервью',
    title: 'Что от вас ждут',
  },
  isAvailable: true,
  result: {
    items: ['Назвать, зачем нужен хук', 'Показать его на коротком примере'],
    label: 'После прочтения вы сможете',
  },
  title: 'Зачем читать эту статью',
})

const meta = (keywords: string[]): ArticleMetaData => ({
  complexity: '2',
  importance: '1',
  keywords,
  skill: ['frontend'],
  skillLabel: 'Навыки',
  subscribe: { href: 'https://t.me/frontend', label: 'frontend в Telegram' },
  tech: 'React',
})

const hooks: Article = {
  access: 'open',
  accordion: accordion('Основы React · хуки с 16.8'),
  ad: { label: 'Реклама', size: '240 × 400' },
  content: {
    markdown: `
## Что такое хуки {#what}

Хуки появились в React 16.8 и позволяют пользоваться состоянием и другими возможностями React в функциональных компонентах. Встроенные хуки — \`useState\`, \`useEffect\`, \`useContext\`, \`useReducer\`. Свою логику можно вынести в кастомный хук.

## Порядок вызова {#order}

React запоминает хуки списком ячеек, привязанным к экземпляру компонента. Каждый вызов читает текущую ячейку и сдвигает указатель на следующую. Поэтому хуки нельзя вызывать в условиях, циклах и вложенных функциях: порядок должен совпадать на каждом рендере.

1. React определяет, какой компонент сейчас рендерится.
2. \`useState\` читает или создаёт ячейку состояния.
3. Следующий хук получает следующую ячейку.
`,
    nextStep: {
      href: '/topics/react/articles/6',
      id: '6',
      title: 'Что такое useState()?',
    },
    previousStep: null,
  },
  id: '5',
  meta: meta(['#React', '#Hooks']),
  title: 'Что такое React хуки?',
  toc: [
    { id: 'what', label: 'Что такое хуки' },
    { id: 'order', label: 'Порядок вызова' },
  ],
  tocLabel: 'На этой странице',
}

const useStateArticle: Article = {
  access: 'open',
  accordion: accordion('Основы React · состояние в функции'),
  ad: { label: 'Реклама', size: '240 × 400' },
  content: {
    markdown: `
## Зачем нужен useState {#why}

\`useState\` добавляет состояние в функциональный компонент. Хук возвращает пару: текущее значение и функцию, которая его обновляет.

\`\`\`jsx
import { useState } from 'react'

function MyComponent() {
  const [count, setCount] = useState(0)

  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
\`\`\`

## Начальное значение {#init}

В отличие от \`setState\` у класса, \`useState\` заменяет значение целиком, а не сливает поля объекта. Если начальное значение дорого считать, передайте функцию: она вызовется только при первом рендере.

\`\`\`jsx
const [todos, setTodos] = useState(createInitialTodos)
\`\`\`
`,
    nextStep: {
      href: '/topics/react/articles/7',
      id: '7',
      title: 'Что такое useEffect()?',
    },
    previousStep: {
      href: '/topics/react/articles/5',
      id: '5',
      title: 'Что такое React хуки?',
    },
  },
  id: '6',
  meta: meta(['#React', '#useState']),
  title: 'Что такое useState()?',
  toc: [
    { id: 'why', label: 'Зачем нужен useState' },
    { id: 'init', label: 'Начальное значение' },
  ],
  tocLabel: 'На этой странице',
}

const useEffectArticle: Article = {
  access: 'open',
  accordion: accordion('Основы React · эффект после рендера'),
  ad: { label: 'Реклама', size: '240 × 400' },
  content: {
    markdown: `
## Эффект после рендера {#effect}

\`useEffect\` запускает код после отрисовки. Хук принимает функцию, которая выполнится после рендера.

\`\`\`jsx
useEffect(() => {
  document.title = \`Вы нажали \${count} раз\`
})
\`\`\`

## Массив зависимостей {#deps}

Второй аргумент — список значений, от которых зависит эффект. Эффект повторится, только когда одно из них изменилось. Пустой массив \`[]\` означает, что эффект не зависит от рендера и выполнится один раз после монтирования.

\`\`\`jsx
useEffect(() => {
  console.log('state1 changed')
}, [state1])
\`\`\`

Не обновляйте состояние внутри эффекта без условия выхода: иначе компонент будет перерисовываться без конца.
`,
    nextStep: null,
    previousStep: {
      href: '/topics/react/articles/6',
      id: '6',
      title: 'Что такое useState()?',
    },
  },
  id: '7',
  meta: meta(['#React', '#useEffect']),
  title: 'Что такое useEffect()?',
  toc: [
    { id: 'effect', label: 'Эффект после рендера' },
    { id: 'deps', label: 'Массив зависимостей' },
  ],
  tocLabel: 'На этой странице',
}

export { hooks as reactHooksArticle, useEffectArticle, useStateArticle }
