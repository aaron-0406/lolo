import { Navigate, useLocation } from 'react-router'

type RedirecRouteProps = {
  pathname: string
}

const RedirectRoute = ({ pathname }: RedirecRouteProps) => {
  const currentLocation = useLocation()
  return <Navigate to={pathname} state={{ from: currentLocation }} replace />
}

export default RedirectRoute
