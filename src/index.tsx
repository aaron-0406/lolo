import ReactDOM from 'react-dom/client'
import App from './app/App'
import { GlobalStyles } from './styles/GlobalStyles'
import { Providers } from './shared/contexts/Providers'
import 'remixicon/fonts/remixicon.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Providers>
    <GlobalStyles />
    <App />
  </Providers>
)
