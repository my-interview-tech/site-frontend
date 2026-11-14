import type { Side, Step } from './graph'

/** Слаг темы → показ. Нет ключа — видна. */
export const topicToggles = {
  // Frontend

  // VCS Hosting disabled
  github: false,
  gitlab: false,
  bitbucket: false,

  // packages
  bun: false,

  // framework
  angular: false,
  svelte: false,
  solid: false,

  // css-frameworks
  tailwind: false,

  // linters
  prettier: false,
  eslint: false,
  biome: false,

  // bundlers
  vite: false,
  esbuild: false,
  rollup: false,
  parcel: false,

  // testing
  playwright: false,
  cypress: false,

  // web-security
  security: false,

  // web-api
  'web-api': false,

  // ssr
  sveltekit: false,
  router: false,
  astro: false,
  eleventy: false,

  // graphql
  apollo: false,
  relay: false,

  // pwa
  pwa: false,

  // mobile
  'react-native': false,
  flutter: false,
  ionic: false,

  // webview
  webview: false,

  // desktop
  electron: false,
  tauri: false,

  // deploy
  vercel: false,
  netlify: false,
  cloudflare: false,

  // performance
  lighthouse: false,
  devtools: false,
  'service-workers': false,

  // a11y
  a11y: false,

  // Backend

  // language
  java: false,
  php: false,
  csharp: false,
  ruby: false,
  python: false,

  // relational
  mysql: false,
  mariadb: false,
  sqlite: false,
  oracle: false,
  mssql: false,
  migrations: false,
  'n-plus-one': false,

  // api
  api: false,
  rest: false,
  grpc: false,
  openapi: false,
  graphql: false,
  soap: false,

  // auth
  jwt: false,
  oauth: false,
  'basic-auth': false,
  openid: false,
  saml: false,

  // caching
  redis: false,
  'http-cache': false,
  memcached: false,

  // web-servers
  apache: false,
  caddy: false,
  iis: false,

  // ai
  llm: false,
  rag: false,
  embeddings: false,

  // ci/cd
  cicd: false,

  // databases-more
  transactions: false,
  orm: false,
  acid: false,
  normalization: false,

  // testing
  'unit-testing': false,
  'integration-testing': false,
  'functional-testing': false,

  // containers
  docker: false,
  kubernetes: false,

  // brokers
  kafka: false,
  rabbitmq: false,

  // architecture
  monolith: false,
  microservices: false,
  serverless: false,
  'service-mesh': false,

  // search
  elasticsearch: false,
  solr: false,

  // realtime
  websockets: false,
  sse: false,
  polling: false,

  // db-scale
  indexes: false,
  replication: false,
  sharding: false,
  cap: false,

  // nosql
  dynamodb: false,
  cassandra: false,

  // scale
  observability: false,
  'circuit-breaker': false,
  throttling: false,
} as const satisfies Record<string, boolean>

const isTopicVisible = (slug: string): boolean => (topicToggles as Record<string, boolean | undefined>)[slug] !== false

const visibleSide = (side: Side | undefined): Side | undefined => {
  if (!side) {
    return undefined
  }

  const head = side.head && isTopicVisible(side.head.slug) ? side.head : undefined
  const items = side.items.filter((item) => isTopicVisible(item.slug))

  if (!head && items.length === 0) {
    return undefined
  }

  return { ...side, head, items }
}

const topicCount = (side: Side | undefined): number => (side?.head ? 1 : 0) + (side?.items.length ?? 0)

/**
 * Шаги без тем, скрытых тоглом.
 * Заметка остаётся. Шаг без оставшихся тем удаляется.
 */
export const visibleSteps = (steps: readonly Step[]): Step[] =>
  steps.flatMap((step): Step[] => {
    if (step.kind === 'note') {
      return [step]
    }

    if (step.kind === 'group') {
      const topics = step.topics.filter((item) => isTopicVisible(item.slug))

      return topics.length > 0 ? [{ ...step, topics }] : []
    }

    if (step.kind === 'fork') {
      const left = visibleSide(step.left)
      const right = visibleSide(step.right)

      return topicCount(left) + topicCount(right) > 0 ? [{ ...step, left, right }] : []
    }

    if (!isTopicVisible(step.topic.slug)) {
      return []
    }

    return [{ ...step, left: visibleSide(step.left), right: visibleSide(step.right) }]
  })
