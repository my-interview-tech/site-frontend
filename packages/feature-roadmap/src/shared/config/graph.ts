type LayerId = 'product' | 'tooling' | 'uikit'
type StackId = 'angular' | 'react' | 'vue'
type TopicStack = StackId | 'solid' | 'svelte'

interface Topic {
  count?: string
  description?: string
  disabled?: boolean
  icon?: string
  layers?: LayerId[]
  slug: string
  soon?: boolean
  stacks?: TopicStack[]
  title: string
}

interface Side {
  head?: Topic
  items: Topic[]
  label?: string
}

interface NodeStep {
  kind: 'node'
  left?: Side
  right?: Side
  topic: Topic
}

interface NoteStep {
  kind: 'note'
  promo?: string
  text: string
}

interface GroupStep {
  kind: 'group'
  topics: Topic[]
}

interface ForkStep {
  kind: 'fork'
  left?: Side
  right?: Side
  slug: string
  title: string
}

type Step = ForkStep | GroupStep | NodeStep | NoteStep

const topic = (title: string, slug: string, count?: string, icon?: string, description?: string): Topic => ({
  count,
  description,
  icon,
  slug,
  title,
})

const place = (item: Topic, layers: LayerId[], stacks?: TopicStack[]): Topic => ({
  ...item,
  layers,
  stacks,
})

const off = (item: Topic): Topic => ({ ...item, disabled: true })

const soon = (item: Topic): Topic => ({ ...item, disabled: true, soon: true })

const allLayers: LayerId[] = ['product', 'tooling', 'uikit']
const product: LayerId[] = ['product']
const productUi: LayerId[] = ['product', 'uikit']
const tooling: LayerId[] = ['tooling']
const uikit: LayerId[] = ['uikit']
const toolingUi: LayerId[] = ['tooling', 'uikit']

const fork = (title: string, slug: string, right?: Side, left?: Side): ForkStep => ({
  kind: 'fork',
  left,
  right,
  slug,
  title,
})

const node = (item: Topic, left?: Side, right?: Side): NodeStep => ({
  kind: 'node',
  left,
  right,
  topic: item,
})

const steps: Step[] = [
  node(place(topic('Браузер и сеть', 'browser', '85 вопросов', 'icon-network'), allLayers)),
  {
    kind: 'group',
    topics: [
      place(
        topic('HTML', 'html', '95 вопросов', 'icon-html', 'Разметка страницы: структура, семантика и доступность.'),
        allLayers
      ),
      place(topic('CSS', 'css', '110 вопросов', 'icon-css'), allLayers),
      place(topic('JavaScript', 'javascript', '240 вопросов', 'icon-javascript'), allLayers),
    ],
  },
  {
    kind: 'note',
    // todo: включить после добавления Auth.
    // promo: 'Запись к ментору',
    text: 'HTML, CSS и JavaScript — основа веба. Закрепляйте их проектами.',
  },
  fork('Система контроля версий', 'vcs', undefined, {
    items: [place(topic('Git', 'git', '50 вопросов', 'icon-git'), allLayers)],
  }),
  fork('VCS Hosting', 'vcs-hosting', {
    items: [
      off(place(topic('GitHub', 'github', undefined, 'icon-github'), allLayers)),
      off(place(topic('GitLab', 'gitlab', undefined, 'icon-gitlab'), allLayers)),
      off(topic('Bitbucket', 'bitbucket', undefined, 'icon-bitbucket')),
    ],
  }),
  fork('Пакетные менеджеры', 'packages', undefined, {
    items: [
      place(topic('npm', 'npm', undefined, 'icon-npm'), tooling),
      soon(off(place(topic('pnpm', 'pnpm', undefined, 'icon-pnpm'), tooling))),
      soon(off(place(topic('yarn', 'yarn', undefined, 'icon-yarn'), tooling))),
      off(place(topic('Bun', 'bun', undefined, 'icon-bun'), tooling)),
    ],
  }),
  { kind: 'note', text: 'На этом этапе уже можно собирать приложения на чистом JavaScript.' },
  fork('Фреймворк', 'framework', {
    items: [
      place(
        topic('React', 'react', '280 вопросов', 'icon-react', 'Компоненты, состояние и рендер интерфейса.'),
        productUi,
        ['react']
      ),
      soon(place(topic('Vue.js', 'vue', undefined, 'icon-vue'), productUi, ['vue'])),
      off(place(topic('Angular', 'angular', undefined, 'icon-angular'), productUi, ['angular'])),
      off(place(topic('Svelte', 'svelte', undefined, 'icon-svelte'), product, ['svelte'])),
      off(place(topic('Solid', 'solid', undefined, 'icon-solid'), product, ['solid'])),
    ],
  }),
  fork('CSS-фреймворки', 'css-frameworks', undefined, {
    items: [off(place(topic('Tailwind', 'tailwind', undefined, 'icon-tailwind'), uikit))],
  }),
  fork('Линтеры и форматтеры', 'linters', {
    items: [
      place(topic('Prettier', 'prettier', undefined, 'icon-prettier'), toolingUi),
      place(topic('ESLint', 'eslint', undefined, 'icon-eslint'), toolingUi),
      off(place(topic('Biome', 'biome', undefined, 'icon-biome'), tooling)),
    ],
  }),
  fork('Сборщики', 'bundlers', undefined, {
    items: [
      off(place(topic('Vite', 'vite', undefined, 'icon-vite'), tooling)),
      off(place(topic('esbuild', 'esbuild', undefined, 'icon-esbuild'), tooling)),
      off(place(topic('Rollup', 'rollup', undefined, 'icon-rollup'), tooling)),
      off(place(topic('Parcel', 'parcel', undefined, 'icon-parcel'), tooling)),
      place(topic('Webpack', 'webpack', '55 вопросов', 'icon-webpack'), tooling),
    ],
  }),
  fork('Тестирование', 'testing', {
    items: [
      place(topic('Основы тестирования', 'testing', '70 вопросов', 'icon-test'), productUi),
      soon(off(place(topic('Vitest', 'vitest', undefined, 'icon-vitest'), productUi))),
      place(topic('Jest', 'jest', undefined, 'icon-jest'), productUi),
      off(place(topic('Playwright', 'playwright', undefined, 'icon-playwright'), productUi)),
      off(topic('Cypress', 'cypress', undefined, 'icon-cypress')),
    ],
  }),
  node(place(topic('Web Security', 'security', '45 вопросов', 'icon-csp'), allLayers)),
  node(place(topic('Web API', 'web-api', '60 вопросов', 'icon-web-api'), allLayers)),
  node(place(topic('TypeScript', 'typescript', '220 вопросов', 'icon-typescript'), allLayers)),
  fork('SSR / SSG', 'ssr', undefined, {
    items: [
      place(topic('Next.js', 'nextjs', '90 вопросов', 'icon-next'), product, ['react']),
      soon(off(place(topic('Nuxt.js', 'nuxt', undefined, 'icon-nuxt'), product, ['vue']))),
      off(place(topic('SvelteKit', 'sveltekit', undefined, 'icon-svelte'), product, ['svelte'])),
      off(place(topic('React Router', 'router', undefined, 'icon-react-router'), product, ['react'])),
      off(topic('Astro', 'astro', undefined, 'icon-astro')),
      off(topic('Eleventy', 'eleventy', undefined, 'icon-eleventy')),
    ],
  }),
  fork('GraphQL', 'graphql', {
    items: [
      off(topic('Apollo', 'apollo', undefined, 'icon-apollo')),
      off(topic('Relay', 'relay', undefined, 'icon-relay')),
    ],
  }),
  node(off(topic('PWA', 'pwa', undefined, 'icon-pwa'))),
  fork('Мобильные приложения', 'mobile', undefined, {
    items: [
      off(place(topic('React Native', 'react-native', undefined, 'icon-react'), product, ['react'])),
      off(topic('Flutter', 'flutter', undefined, 'icon-flutter')),
      off(topic('Ionic', 'ionic', undefined, 'icon-ionic')),
    ],
  }),
  node(off(topic('WebView', 'webview', undefined, 'icon-webview'))),
  fork('Десктоп', 'desktop', {
    items: [
      off(topic('Electron', 'electron', undefined, 'icon-electron')),
      off(topic('Tauri', 'tauri', undefined, 'icon-tauri')),
    ],
  }),
  { kind: 'note', text: 'Дальше — уровень уверенного мидл-фронтенда.' },
  fork('Деплой', 'deploy', undefined, {
    items: [
      off(place(topic('Vercel', 'vercel', undefined, 'icon-vercel'), product, ['react'])),
      off(topic('Netlify', 'netlify', undefined, 'icon-netlify')),
      off(topic('Cloudflare', 'cloudflare', undefined, 'icon-cloudflare')),
    ],
  }),
  fork('Производительность', 'performance', {
    items: [
      off(place(topic('Lighthouse', 'lighthouse', undefined, 'icon-lighthouse'), product, ['react'])),
      off(place(topic('DevTools', 'devtools', undefined, 'icon-devtools'), product, ['react'])),
      off(topic('Service Workers', 'service-workers', undefined, 'icon-service-workers')),
    ],
  }),
  node(off(place(topic('Доступность', 'a11y', undefined, 'icon-a11y'), productUi))),
  node(soon(place(topic('Дизайн-системы', 'design-systems', undefined, 'icon-design-systems'), uikit))),
]

const line = (items: Topic[]): Step[] => items.map((item) => node(item))

const backendSteps: Step[] = [
  node(topic('Браузер и сеть', 'browser', '85 вопросов', 'icon-network')),
  fork('Основы фронтенда', 'frontend-basics', undefined, {
    items: [
      topic('HTML', 'html', '95 вопросов', 'icon-html', 'Разметка страницы: структура, семантика и доступность.'),
      topic('CSS', 'css', '110 вопросов', 'icon-css'),
      topic('JavaScript', 'javascript', '240 вопросов', 'icon-javascript'),
    ],
  }),
  fork('Язык', 'language', {
    items: [
      topic('Node.js', 'nodejs', '90 вопросов', 'icon-node'),
      topic('Java', 'java', undefined, 'icon-java'),
      off(topic('PHP', 'php', undefined, 'icon-php')),
      off(topic('C#', 'csharp', undefined, 'icon-csharp')),
      off(topic('Ruby', 'ruby', undefined, 'icon-ruby')),
      soon(topic('Go', 'go', undefined, 'icon-go')),
      soon(off(topic('Rust', 'rust', undefined, 'icon-rust'))),
      off(topic('Python', 'python', undefined, 'icon-python')),
    ],
  }),
  { kind: 'note', text: 'Одного языка достаточно. Остальные — по необходимости.' },
  fork('Система контроля версий', 'vcs', undefined, {
    items: [topic('Git', 'git', '50 вопросов', 'icon-git')],
  }),
  fork('VCS Hosting', 'vcs-hosting', {
    items: [
      off(topic('GitHub', 'github', undefined, 'icon-github')),
      off(topic('GitLab', 'gitlab', undefined, 'icon-gitlab')),
      off(topic('Bitbucket', 'bitbucket', undefined, 'icon-bitbucket')),
    ],
  }),
  fork('Реляционные базы', 'relational', undefined, {
    items: [
      soon(topic('SQL', 'sql', undefined, 'icon-sql')),
      soon(topic('PostgreSQL', 'postgresql', undefined, 'icon-postgresql')),
      off(topic('MySQL', 'mysql', undefined, 'icon-mysql')),
      off(topic('MariaDB', 'mariadb', undefined, 'icon-mariadb')),
      off(topic('SQLite', 'sqlite', undefined, 'icon-sqlite')),
      off(topic('Oracle', 'oracle', undefined, 'icon-oracle')),
      off(topic('MS SQL', 'mssql', undefined, 'icon-mssql')),
      topic('Миграции', 'migrations', undefined, 'icon-migrations'),
      topic('N+1', 'n-plus-one', undefined, 'icon-nplus1'),
    ],
  }),
  { kind: 'note', text: 'На этом этапе уже можно идти на первую работу. Закрепляйте проекты.' },
  fork('API', 'api', {
    items: [
      topic('API', 'api', '90 вопросов', 'icon-network'),
      topic('REST', 'rest', '50 вопросов', 'icon-rest'),
      topic('gRPC', 'grpc', '60 вопросов', 'icon-grpc'),
      topic('OpenAPI', 'openapi', '30 вопросов', 'icon-openapi'),
      off(topic('GraphQL', 'graphql', undefined, 'icon-graphql')),
      off(topic('SOAP', 'soap', undefined, 'icon-soap')),
    ],
  }),
  fork('Аутентификация', 'auth', undefined, {
    items: [
      topic('JWT', 'jwt', '40 вопросов', 'icon-jwt'),
      topic('OAuth', 'oauth', '35 вопросов', 'icon-oauth'),
      off(topic('Basic Auth', 'basic-auth', undefined, 'icon-https')),
      off(topic('OpenID', 'openid', undefined, 'icon-oauth')),
      off(topic('SAML', 'saml', undefined, 'icon-jwt')),
    ],
  }),
  fork('Кеширование', 'caching', {
    items: [
      topic('Redis', 'redis', '85 вопросов', 'icon-redis'),
      topic('HTTP-кеш', 'http-cache', '25 вопросов', 'icon-http-cache'),
      off(topic('Memcached', 'memcached', undefined, 'icon-memcached')),
    ],
  }),
  fork('Веб-серверы', 'web-servers', undefined, {
    items: [
      soon(topic('Nginx', 'nginx', '40 вопросов', 'icon-nginx')),
      off(topic('Apache', 'apache', undefined, 'icon-apache')),
      off(topic('Caddy', 'caddy', undefined, 'icon-caddy')),
      off(topic('IIS', 'iis', undefined, 'icon-iis')),
    ],
  }),
  node(topic('Безопасность', 'security', '45 вопросов', 'icon-csp')),
  fork('AI', 'ai', {
    items: [
      topic('LLM', 'llm', '40 вопросов', 'icon-llm'),
      topic('RAG', 'rag', '30 вопросов', 'icon-rag'),
      topic('Эмбеддинги', 'embeddings', '25 вопросов', 'icon-embeddings'),
    ],
  }),
  node(topic('CI/CD', 'cicd', '70 вопросов', 'icon-cicd')),
  fork('Ещё о базах', 'databases-more', undefined, {
    items: [
      topic('Транзакции', 'transactions', '40 вопросов', 'icon-transactions'),
      topic('ORM', 'orm', '35 вопросов', 'icon-orm'),
      topic('ACID', 'acid', '30 вопросов', 'icon-acid'),
      topic('Нормализация', 'normalization', '25 вопросов', 'icon-normalization'),
    ],
  }),
  fork('Тестирование', 'testing', {
    items: [
      topic('Модульные', 'unit-testing', '60 вопросов', 'icon-unit'),
      topic('Интеграционные', 'integration-testing', '45 вопросов', 'icon-integration'),
      topic('Функциональные', 'functional-testing', '30 вопросов', 'icon-functional'),
    ],
  }),
  fork('Контейнеры', 'containers', undefined, {
    items: [
      topic('Docker', 'docker', '70 вопросов', 'icon-docker'),
      topic('Kubernetes', 'kubernetes', '80 вопросов', 'icon-kubernetes'),
    ],
  }),
  fork('Брокеры', 'brokers', {
    items: [
      topic('Kafka', 'kafka', '90 вопросов', 'icon-kafka'),
      off(topic('RabbitMQ', 'rabbitmq', undefined, 'icon-rabbitmq')),
    ],
  }),
  fork('Архитектура', 'architecture', undefined, {
    items: [
      topic('Монолит', 'monolith', '25 вопросов', 'icon-monolith'),
      topic('Микросервисы', 'microservices', '40 вопросов', 'icon-microservices'),
      topic('Serverless', 'serverless', '30 вопросов', 'icon-serverless'),
      topic('Service Mesh', 'service-mesh', '20 вопросов', 'icon-service-mesh'),
    ],
  }),
  fork('Поиск', 'search', {
    items: [
      topic('Elasticsearch', 'elasticsearch', '35 вопросов', 'icon-elasticsearch'),
      off(topic('Solr', 'solr', undefined, 'icon-solr')),
    ],
  }),
  fork('Реальное время', 'realtime', undefined, {
    items: [
      topic('WebSockets', 'websockets', '30 вопросов', 'icon-websocket'),
      topic('SSE', 'sse', '20 вопросов', 'icon-sse'),
      topic('Long Polling', 'polling', '20 вопросов', 'icon-polling'),
    ],
  }),
  fork('Масштабирование баз', 'db-scale', {
    items: [
      topic('Индексы', 'indexes', '35 вопросов', 'icon-indexes'),
      topic('Репликация', 'replication', '30 вопросов', 'icon-replication'),
      topic('Шардирование', 'sharding', '30 вопросов', 'icon-sharding'),
      topic('CAP', 'cap', '25 вопросов', 'icon-cap'),
    ],
  }),
  { kind: 'note', text: 'Большинство NoSQL-баз может не понадобиться. Важно понимать, когда они нужны.' },
  fork('NoSQL', 'nosql', undefined, {
    items: [
      soon(topic('MongoDB', 'mongodb', '40 вопросов', 'icon-mongodb')),
      off(topic('DynamoDB', 'dynamodb', undefined, 'icon-dynamodb')),
      off(topic('Cassandra', 'cassandra', undefined, 'icon-cassandra')),
    ],
  }),
  fork('Масштабирование', 'scale', {
    items: [
      topic('Наблюдаемость', 'observability', '35 вопросов', 'icon-observability'),
      topic('Circuit Breaker', 'circuit-breaker', '20 вопросов', 'icon-circuit'),
      topic('Throttling', 'throttling', '20 вопросов', 'icon-throttle'),
    ],
  }),
  node(soon(topic('System Design', 'system-design', '120 вопросов', 'icon-system-design'))),
]

interface LayerOption {
  id: LayerId
  title: string
}

interface StackOption {
  id: StackId
  title: string
}

interface Track {
  id: string
  /** Трек скрыт из переключателя, `?track=` с ним ведёт на трек по умолчанию. */
  isClosed?: boolean
  layers?: LayerOption[]
  lead: string
  stacks?: StackOption[]
  steps: Step[]
  title: string
}

const tracks: Track[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    lead: 'Путь фронтенд-разработчика',
    layers: [
      { id: 'product', title: 'Продукт' },
      { id: 'uikit', title: 'Дизайн-система' },
      { id: 'tooling', title: 'Сборка' },
    ],
    stacks: [
      { id: 'react', title: 'React' },
      { id: 'vue', title: 'Vue' },
      { id: 'angular', title: 'Angular' },
    ],
    steps,
  },
  {
    id: 'backend',
    title: 'Backend',
    lead: 'Путь бэкенд-разработчика',
    steps: backendSteps,
  },
  {
    id: 'qa',
    isClosed: true,
    title: 'QA',
    lead: 'Путь тестировщика',
    steps: line([
      topic('Тестирование', 'testing', '140 вопросов', 'icon-test'),
      topic('API', 'api', '90 вопросов', 'icon-network'),
      topic('Playwright', 'playwright', '80 вопросов', 'icon-playwright'),
      topic('SQL', 'sql', '70 вопросов', 'icon-sql'),
      topic('Cypress', 'cypress', '60 вопросов', 'icon-cypress'),
      topic('System Design', 'system-design', '50 вопросов', 'icon-system-design'),
      topic('Git', 'git', '40 вопросов', 'icon-git'),
    ]),
  },
  {
    id: 'analytic',
    isClosed: true,
    title: 'System Analytic',
    lead: 'Путь системного аналитика',
    steps: line([
      topic('Требования', 'requirements', '110 вопросов', 'icon-requirements'),
      topic('SQL', 'sql', '90 вопросов', 'icon-sql'),
      topic('API', 'api', '80 вопросов', 'icon-network'),
      topic('BPMN', 'bpmn', '70 вопросов', 'icon-bpmn'),
      topic('System Design', 'system-design', '60 вопросов', 'icon-system-design'),
      topic('Документация', 'docs', '40 вопросов', 'icon-docs'),
    ]),
  },
  {
    id: 'devops',
    isClosed: true,
    title: 'DevOps',
    lead: 'Путь DevOps-инженера',
    steps: line([
      topic('Docker', 'docker', '90 вопросов', 'icon-docker'),
      topic('Kubernetes', 'kubernetes', '80 вопросов', 'icon-kubernetes'),
      topic('CI/CD', 'cicd', '70 вопросов', 'icon-cicd'),
      topic('Сети', 'network', '55 вопросов', 'icon-network'),
      topic('Git', 'git', '50 вопросов', 'icon-git'),
      topic('Terraform', 'terraform', '45 вопросов', 'icon-terraform'),
      topic('Nginx', 'nginx', '40 вопросов', 'icon-nginx'),
    ]),
  },
]

const openTracks: Track[] = tracks.filter((item) => !item.isClosed)

const defaultTrackId = openTracks[0]?.id ?? 'frontend'

/**
 * Открытый трек из `?track=`. Закрытый, неизвестный или пустой — трек по умолчанию.
 */
const trackIdOf = (value: string | null): string => openTracks.find((item) => item.id === value)?.id ?? defaultTrackId

export type { LayerId, LayerOption, Side, StackId, StackOption, Step, Topic, Track }
export { openTracks, trackIdOf }
