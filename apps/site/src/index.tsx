import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes as Application } from '@generouted/react-router/lazy'

import { ym } from '@my-interview/common'

import './index.css'

// Инициализация Яндекс.Метрики
ym(Number(import.meta.env.VITE_YM_COUNTER_ID))

const CHUNK_RELOAD_KEY = 'chunk-reload-at'
const CHUNK_RELOAD_COOLDOWN_MS = 10_000

// После выкладки старые чанки удалены: открытая вкладка перезагружается за новым index.html.
// Пауза между перезагрузками не даёт зациклиться, если чанка нет и в новой сборке.
window.addEventListener('vite:preloadError', (event) => {
  const lastReloadAt = Number(sessionStorage.getItem(CHUNK_RELOAD_KEY))

  if (Date.now() - lastReloadAt < CHUNK_RELOAD_COOLDOWN_MS) return

  event.preventDefault()
  sessionStorage.setItem(CHUNK_RELOAD_KEY, String(Date.now()))
  window.location.reload()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Application />
  </StrictMode>
)
