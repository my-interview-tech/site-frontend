import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes as Application } from '@generouted/react-router'

import { ym } from '@my-interview/common'

import './index.css'

// Инициализация Яндекс.Метрики
ym(Number(import.meta.env.VITE_YM_COUNTER_ID))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Application />
  </StrictMode>
)
