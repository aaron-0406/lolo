import { Outlet } from 'react-router-dom'
import RedirectRoute from '../RedirectRoute'

type GuestRouteProps = {
  pathname: string
}

const GuestRoute: React.FC<GuestRouteProps> = ({ pathname }) => {
  //TODO: Get isAuthenticated from context - useGeneralContext
  const isAuthenticated = true

  if (isAuthenticated) {
    return <RedirectRoute pathname={pathname} />
  }

  return (
    <div className="login-provider">
      <Outlet />
    </div>
  )
}

export default GuestRoute
