import { createRoot } from 'react-dom/client'
import './i18n'
import './index.css'
import App from './App.tsx'
import { preloadRoute } from './router/loaders'

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root element not found')

// #root holds the static pre-React placeholder (index.html / prerendered
// pages). It is not React markup, so never hydrate it: createRoot replaces it
// in the same frame as the first commit. Load the current route's chunk first
// so that first commit is the real page, not the Suspense fallback.
const base = __BASE_PATH__.replace(/\/$/, '')
const path = window.location.pathname.slice(base.length) || '/'

void preloadRoute(path).then(() => {
  createRoot(rootEl).render(<App />)
  // React renders an equivalent JSON-LD itself; drop the prerendered copy.
  document.getElementById('prerender-jsonld')?.remove()
})
