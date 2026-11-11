import type { QuizChoice, QuizComponent, QuizLoad, QuizRequest } from '../model'

const LOAD_MS = 400
const SERVER_TIME = 1790153765
const RETRY_SECONDS = 12 * 60 * 60

const quizMeta = (retryAt: number | null) => ({
  ad: { caption: '240 × 400', id: 'quiz-side', label: 'Реклама' },
  intro: {
    checks: ['Где выполняется Server Component', 'Что можно делать на сервере', 'Как отделить клиентский код'],
    rules: [
      'На вопрос даётся 30 секунд.',
      'Если время вышло и ответа нет, вопрос остаётся незакрытым.',
      'Несданный квиз можно пройти снова через 12 часов по времени сервера.',
    ],
  },
  questionSeconds: 30,
  retryAt,
  serverDate: { id: 'serverDate', value: SERVER_TIME },
})

type Step = {
  action: 'submit' | 'toForm'
  back: boolean
  choice: QuizChoice
  index: number
  total: number
}

const stepPage = ({ action, back, choice, index, total }: Step): QuizComponent[] => [
  {
    component: 'navBar',
    id: `nav-${choice.id}`,
    isCloseAvailable: false,
    isStepBackAvailable: back,
    label: `Шаг ${index} из ${total}`,
  },
  {
    component: 'title',
    id: `title-${choice.id}`,
    label: 'Проверьте понимание',
    visibility: true,
  },
  choice,
  {
    buttonAction: action,
    component: 'footerButton',
    id: `footer-${choice.id}`,
    label: action === 'submit' ? 'Завершить' : 'Продолжить',
    type: 'primary',
  },
]

const rscQuiz = (): QuizLoad => {
  const choices: QuizChoice[] = [
    {
      component: 'choice',
      id: 'where',
      label: 'Где по умолчанию выполняется React Server Component?',
      options: [
        { id: 'browser', label: 'В браузере при каждом рендере' },
        { id: 'server', label: 'На сервере, код компонента клиенту не отправляется' },
        { id: 'effect', label: 'Только внутри useEffect' },
        { id: 'worker', label: 'В web worker страницы' },
      ],
      visibility: true,
    },
    {
      component: 'choice',
      id: 'async',
      label: 'Что можно делать в Server Component?',
      options: [
        { id: 'state', label: 'Хранить состояние в useState' },
        { id: 'click', label: 'Вешать onClick на кнопку' },
        { id: 'fetch', label: 'Читать данные на сервере через async' },
        { id: 'context', label: 'Читать клиентский React context' },
      ],
      visibility: true,
    },
    {
      component: 'choice',
      id: 'client',
      label: 'Как пометить компонент, которому нужны хуки браузера?',
      options: [
        { id: 'client', label: "Директива 'use client' в начале файла" },
        { id: 'async', label: 'export default async' },
        { id: 'server', label: "Директива 'use server' на компоненте" },
        { id: 'memo', label: 'Обёртка React.memo' },
      ],
      visibility: true,
    },
    {
      component: 'choice',
      id: 'bundle',
      label: 'Попадает ли код Server Component в JavaScript-бандл браузера?',
      options: [
        { id: 'yes', label: 'Да, вместе с клиентскими компонентами' },
        { id: 'no', label: 'Нет, в браузер уходит готовый результат рендера' },
        { id: 'lazy', label: 'Да, но отдельным чанком по запросу' },
        { id: 'wasm', label: 'Да, как WebAssembly-модуль' },
      ],
      visibility: true,
    },
    {
      component: 'choice',
      id: 'children',
      label: 'Что будет, если передать Server Component как children в Client Component?',
      options: [
        { id: 'client', label: 'Он станет клиентским и потеряет серверный рендер' },
        { id: 'server', label: 'Он останется серверным: клиент получит уже готовый слот' },
        { id: 'error', label: 'Сборка упадёт: children могут быть только строкой' },
        { id: 'twice', label: 'Он выполнится на сервере и ещё раз в браузере' },
      ],
      visibility: true,
    },
    {
      component: 'choice',
      id: 'directive',
      label: "Для чего нужна директива 'use server'?",
      options: [
        { id: 'component', label: 'Пометить файл как Server Component' },
        { id: 'action', label: 'Объявить Server Action, которую можно вызвать с клиента' },
        { id: 'route', label: 'Включить серверный роутинг этой страницы' },
        { id: 'hooks', label: 'Запретить хуки во всём поддереве' },
      ],
      visibility: true,
    },
    {
      component: 'choice',
      id: 'props',
      label: 'Что нельзя передать пропом из Server Component в Client Component?',
      options: [
        { id: 'plain', label: 'Строку, число и простой объект' },
        { id: 'fn', label: 'Обычную функцию' },
        { id: 'child', label: 'Серверный компонент как children' },
        { id: 'action', label: 'Server Action' },
      ],
      visibility: true,
    },
    {
      component: 'choice',
      id: 'secret',
      label:
        'Куда попадёт секрет без NEXT_PUBLIC_, если его прочитали только в Server Component и не передали на клиент?',
      options: [
        { id: 'bundle', label: 'В клиентский бандл вместе с компонентом' },
        { id: 'html', label: 'Всегда в HTML, его видно в исходнике страницы' },
        { id: 'server', label: 'Останется на сервере и в браузер не отправится' },
        { id: 'cookie', label: 'В cookie документа' },
      ],
      visibility: true,
    },
    {
      component: 'choice',
      id: 'refresh',
      label: 'Запускается ли Server Component заново, когда в Client Component меняется useState?',
      options: [
        { id: 'yes', label: 'Да, на каждый setState' },
        { id: 'no', label: 'Нет, нужен новый запрос: навигация или router.refresh' },
        { id: 'context', label: 'Да, если состояние лежит в React context' },
        { id: 'memo', label: 'Да, если клиентский компонент обёрнут в memo' },
      ],
      visibility: true,
    },
    {
      component: 'choice',
      id: 'guard',
      label: 'Зачем пакет server-only?',
      options: [
        { id: 'tree', label: 'Убрать модуль из серверного дерева' },
        { id: 'throw', label: 'Уронить сборку, если модуль импортировали из клиентского кода' },
        { id: 'cache', label: 'Закэшировать ответ Server Component' },
        { id: 'types', label: "Включить типы для директивы 'use server'" },
      ],
      visibility: true,
    },
  ]

  return {
    answers: {
      async: 'fetch',
      bundle: 'no',
      children: 'server',
      client: 'client',
      directive: 'action',
      guard: 'throw',
      props: 'fn',
      refresh: 'no',
      secret: 'server',
      where: 'server',
    },
    id: '4',
    pages: choices.map((choice, index) =>
      stepPage({
        action: index === choices.length - 1 ? 'submit' : 'toForm',
        back: index > 0,
        choice,
        index: index + 1,
        total: choices.length,
      })
    ),
    ...quizMeta(null),
    processId: '1CC97FC2-F61E-4982-93B3-AE1DD893F8DC',
    title: 'Продвинутый разбор по React',
    topicTitle: 'React',
  }
}

const shortQuiz = ({ id, tech }: QuizRequest): QuizLoad => {
  const choice: QuizChoice = {
    component: 'choice',
    id: 'overview',
    label: `Короткий вопрос по ${tech}`,
    options: [
      { id: 'a', label: 'Вариант A' },
      { id: 'b', label: 'Вариант B' },
      { id: 'c', label: 'Вариант C' },
      { id: 'd', label: 'Вариант D' },
    ],
    visibility: true,
  }

  return {
    answers: { overview: 'a' },
    id,
    pages: [stepPage({ action: 'submit', back: false, choice, index: 1, total: 1 })],
    ...quizMeta(id === 'locked' ? SERVER_TIME + RETRY_SECONDS : null),
    processId: `quiz-${tech}-${id}`,
    title: `Квиз по ${tech}`,
    topicTitle: tech,
  }
}

const resolveQuiz = (request: QuizRequest): QuizLoad => {
  if (request.id === '4' && (request.tech === 'react' || request.tech === 'nextjs')) {
    const quiz = rscQuiz()

    if (request.tech === 'nextjs') {
      return {
        ...quiz,
        title: 'Что такое React Server Components?',
        topicTitle: 'Next.js',
      }
    }

    return quiz
  }

  return shortQuiz(request)
}

const loadQuiz = (request: QuizRequest): Promise<QuizLoad> =>
  new Promise((resolve, reject) => {
    globalThis.setTimeout(() => {
      if (request.id === 'error') {
        reject(new Error('unavailable'))

        return
      }

      resolve(resolveQuiz(request))
    }, LOAD_MS)
  })

export { loadQuiz }
