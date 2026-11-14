import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes as Application } from '@generouted/react-router'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Application />
  </StrictMode>
)
