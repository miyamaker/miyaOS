import '@reach/dialog/styles.css'

import { Buffer } from 'buffer'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { HashRouter } from 'react-router-dom'

import App from './App'
import { GlobalHistory } from './GlobalHistory'

window.Buffer = Buffer

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootElement = document.getElementById('app')!
const root = ReactDOM.createRoot(rootElement)
root.render(
  <HashRouter>
    <GlobalHistory />
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </HashRouter>
)
