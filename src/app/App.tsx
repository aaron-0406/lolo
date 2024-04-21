import { useIdleTimer } from 'react-idle-timer'
import AppRouter from '../shared/routes/AppRouter'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useFiltersContext } from '@/contexts/FiltersProvider'

const App = () => {
  const {
    auth: { setAuthenticate },
    clearAll,
  } = useLoloContext()

  const { clearAllFilters } = useFiltersContext()

  const onIdle = () => {
    setAuthenticate(false)
    clearAllFilters()
    clearAll()
  }

  useIdleTimer({
    onIdle,
    timeout: 3600_000,
    throttle: 500,
  })

  return <AppRouter />
}

export default App
