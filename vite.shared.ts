import react from '@vitejs/plugin-react'
import generouted from '@generouted/react-router/plugin'
import dotenvFlow from 'dotenv-flow'
import path from 'path'
import { fileURLToPath } from 'url'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, type UserConfig } from 'vite'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

type AppEnv = 'localhost' | 'test' | 'production'

const VITE_CLIENT_KEYS = [
  'VITE_SITE_URL',
  'VITE_MAIN_APP_URL',
  'VITE_API_URL',
  'VITE_COOKIE_DOMAIN',
] as const

type LoadedEnv = {
  env: {
    NODE_ENV: string
    APP_ENV: AppEnv
    SITE_PORT: string
    MAIN_APP_PORT: string
  }
  define: Record<string, string>
  isDev: boolean
  isAnalyze: boolean
}

let cachedEnv: LoadedEnv | null = null

const createLoadedEnv = (): LoadedEnv => {
  const appEnv: AppEnv = (process.env.APP_ENV as AppEnv) || 'localhost'

  dotenvFlow.config({
    path: path.resolve(rootDir, '.env/.base'),
    node_env: appEnv,
  })

  const env = {
    /** 🔧 Режим: development | production */
    NODE_ENV: process.env.NODE_ENV || 'development',

    /** 🌍 Бизнес-окружение */
    APP_ENV: appEnv,

    /** 🔌 Порт local-сервера site */
    SITE_PORT: process.env.SITE_PORT || '3000',

    /** 🔌 Порт local-сервера main-app */
    MAIN_APP_PORT: process.env.MAIN_APP_PORT || '3001',
  }

  const define: Record<string, string> = {}

  VITE_CLIENT_KEYS.forEach((key) => {
    define[`import.meta.env.${key}`] = JSON.stringify(process.env[key] ?? '')
  })

  return {
    env,
    define,
    isDev: env.NODE_ENV === 'development',
    isAnalyze: process.env.ANALYZE === 'true',
  }
}

export const loadEnv = (): LoadedEnv => {
  if (!cachedEnv) {
    cachedEnv = createLoadedEnv()
  }

  return cachedEnv
}

type ViteConfigOptions = {
  appRoot: string
  port: number
}

export const viteConfig = ({ appRoot, port }: ViteConfigOptions) => {
  const { define, isDev, isAnalyze } = loadEnv()

  return defineConfig({
    // 📂 Рабочая директория приложения (index.html, src/)
    root: appRoot,
    plugins: [
      react(),
      generouted(),
      ...(isAnalyze
        ? [
          visualizer({
            filename: path.join(appRoot, 'build/analytics/bundle-report.html'),
            open: true,
          }),
        ]
        : []),
    ],
    define,
    resolve: {
      tsconfigPaths: true,
    },
    optimizeDeps: {
      // import.meta.glob в generouted должен пересчитываться при изменении pages/
      exclude: ['@generouted/react-router'],
    },
    server: {
      port,
      host: true,
    },
    build: {
      // 📦 Директория production-сборки
      outDir: 'build',

      // 🗺️ Source maps в development, отключены в production
      sourcemap: isDev,

      // ⚠️ Предупреждение, если чанк > 250 KB
      chunkSizeWarningLimit: 250,

      // 🗜️ Минификация только в production
      minify: isDev ? false : 'oxc',
      rolldownOptions: isDev
        ? undefined
        : {
          output: {
            minify: {
              compress: {
                // 🧹 Удаляет console.* при production-сборке (test и prod)
                dropConsole: true,
              },
            },
          },
        },
    },

    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: [path.resolve(rootDir, 'vitest.setup.ts')],
      include: [
        'src/**/*.{test,spec}.{ts,tsx}',
        'src/__tests__/**/*.{ts,tsx}',
      ],
      coverage: {
        provider: 'istanbul',
        exclude: [
          '**/*.index.ts',
          '**/*.styled.{ts,tsx}',
          '**/*.model.{ts,tsx}',
          '**/*.constants.{ts,tsx}',
          '**/*.types.ts',
          '**/*.dto.{ts,tsx}',
          '**/styled/**',
          '**/model/**',
          '**/constants/**',
          '**/types/**',
        ],
      },
    },
  } as UserConfig)
}
