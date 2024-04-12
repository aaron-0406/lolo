import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import GlobalStyles from '../../styles/GlobalStyles'
import initialTheme from '../../styles/theme'
import { QueryClient, QueryClientProvider } from 'react-query'
import { LoloProvider } from './LoloProvider'
import { Toaster } from 'react-hot-toast'
import { DashProvider } from './DashProvider'
import { FiltersProvider } from './FiltersProvider'

interface ProvidersProps {
  children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: false,
        staleTime: 5000,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <DashProvider>
          <LoloProvider>
            <FiltersProvider>
              <ThemeProvider theme={initialTheme}>
                <GlobalStyles />
                <Toaster />
                {children}
              </ThemeProvider>
            </FiltersProvider>
          </LoloProvider>
        </DashProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
