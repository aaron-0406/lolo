import { useIdleTimer } from 'react-idle-timer'
import AppRouter from '../shared/routes/AppRouter'
import { useLoloContext } from '@/contexts/LoloProvider'

const App = () => {
  const {
    auth: { setAuthenticate },
  } = useLoloContext()

  const onIdle = () => {
    setAuthenticate(false)
  }

  useIdleTimer({
    onIdle,
    timeout: 1200_000,
    throttle: 500,
  })

  return <AppRouter />
}

export default App
