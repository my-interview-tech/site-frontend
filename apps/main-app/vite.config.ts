import path from 'path'
import { fileURLToPath } from 'url'

import { loadEnv, viteConfig } from '../../vite.shared'

const appRoot = path.dirname(fileURLToPath(import.meta.url))
const { env } = loadEnv()

export default viteConfig({ appRoot, port: Number(env.MAIN_APP_PORT) })
