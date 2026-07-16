import react from '@vitejs/plugin-react'
import generouted from '@generouted/react-router/plugin'
import dotenvFlow from 'dotenv-flow'
import path from 'path'
import { fileURLToPath } from 'url'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, type UserConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

type AppEnv = 'localhost' | 'test' | 'production'

export const loadEnv = () => {
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

    /** 🌐 URL гостевой зоны (my-interview.tech) */
    SITE_URL: process.env.SITE_URL || '',

    /** 🔌 Порт local-сервера site */
    SITE_PORT: process.env.SITE_PORT || '3000',

    /** 🔒 URL auth-зоны (online.my-interview.tech) */
    MAIN_APP_URL: process.env.MAIN_APP_URL || '',

    /** 🔌 Порт local-сервера main-app */
    MAIN_APP_PORT: process.env.MAIN_APP_PORT || '3001',

    /** 📡 URL backend API */
    API_URL: process.env.API_URL || '',

    /** 🍪 Домен для cookie между поддоменами */
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || '',
  }

  const clientEnv = {
    NODE_ENV: env.NODE_ENV,
    APP_ENV: env.APP_ENV,
    SITE_URL: env.SITE_URL,
    MAIN_APP_URL: env.MAIN_APP_URL,
    API_URL: env.API_URL,
    COOKIE_DOMAIN: env.COOKIE_DOMAIN,
  }

  const define: Record<string, string> = {}

  Object.entries(clientEnv).forEach(([key, value]) => {
    define[`process.env.${key}`] = JSON.stringify(value)
  })

  return { 
    env, 
    define, 
    isDev: env.NODE_ENV === 'development', 
    isAnalyze: process.env.ANALYZE === 'true' 
  }
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
      tsconfigPaths(),
      nodePolyfills({ include: ['process', 'buffer'] }),
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
      minify: isDev ? false : 'terser',
      terserOptions: isDev
        ? undefined
        : {
          compress: {
            // 🧹 Удаляет console.* при production-сборке (test и prod)
            drop_console: !isDev,
          },
        },
    },

    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: [path.resolve(rootDir, 'vitest.setup.ts')],
      include: [
        'src/**/*.{test,spec}.{ts,tsx}', 
        'src/__tests__/**/*.{ts,tsx}'
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
        ]
      },
    },
  } as UserConfig)
}
