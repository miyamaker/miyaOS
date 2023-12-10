import '@reach/dialog/styles.css'

import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { HashRouter } from 'react-router-dom'

import App from './App'
import { GlobalHistory } from './GlobalHistory'
import ReactGA from "react-ga4";

ReactGA.initialize("G-W08254B3RN");
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
