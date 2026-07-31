import { createRoot, hydrateRoot } from 'react-dom/client'
import './i18n'
import './index.css'
import App from './App.tsx'

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root element not found')

// Use hydrate if server-rendered markup exists, otherwise createRoot
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, <App />)
} else {
  createRoot(rootEl).render(<App />)
}