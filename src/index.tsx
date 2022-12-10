import ReactDOM from 'react-dom/client'
import App from './app/App'
import { Providers } from './shared/contexts/Providers'
import { BrowserRouter as Router } from 'react-router-dom'

import 'remixicon/fonts/remixicon.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Providers>
    <Router>
      <App />
    </Router>
  </Providers>
)
