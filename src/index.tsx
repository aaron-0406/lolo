import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import App from './app/App'
import { GlobalStyles } from './styles/GlobalStyles'
import { initialTheme } from './styles/theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ThemeProvider theme={initialTheme}>
    <GlobalStyles />
    <App />
  </ThemeProvider>
)
