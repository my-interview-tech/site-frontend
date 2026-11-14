import path from 'path'
import { fileURLToPath } from 'url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const repoRoot = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: process.cwd(),
  publicDir: path.resolve(repoRoot, 'packages/static'),
  plugins: [react()],
  define: {
    'import.meta.env.VITE_API_MOCK': JSON.stringify(process.env.VITE_API_MOCK ?? 'true'),
  },
  resolve: {
    tsconfigPaths: true,
    conditions: process.env.MY_INTERVIEW_SOURCE === '0' ? [] : ['source'],
  },
  server: {
    host: true,
    strictPort: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: [path.resolve(repoRoot, 'vitest.setup.ts')],
  },
})
