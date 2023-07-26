import { Outlet } from 'react-router-dom'
import RedirectRoute from '../RedirectRoute'
import { useDashContext } from '../../contexts/DashProvider'

type GuestRouteProps = {
  pathname: string
}

const GuestRoute: React.FC<GuestRouteProps> = ({ pathname }) => {
  //TODO: Get isAuthenticated from context - useGeneralContext
  const {
    auth: { authenticate },
  } = useDashContext()

  // const isAuthenticated = true

  if (authenticate) {
    return <RedirectRoute pathname={pathname} />
  }

  return (
    <div className="login-provider">
      <Outlet />
    </div>
  )
}

export default GuestRoute
