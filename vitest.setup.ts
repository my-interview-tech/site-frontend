import '@testing-library/jest-dom/vitest'
import dotenvFlow from 'dotenv-flow'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { TextDecoder, TextEncoder } from 'node:util'

const rootDir = dirname(fileURLToPath(import.meta.url))

dotenvFlow.config({ path: resolve(rootDir, '.env/.base') })

Object.assign(globalThis, { TextDecoder, TextEncoder })
