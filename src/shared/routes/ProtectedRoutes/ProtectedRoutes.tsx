import { useQuery } from 'react-query'
import { Outlet } from 'react-router-dom'
import storage from '../../utils/storage'
import RedirectRoute from '../RedirectRoute'
import MenuDash from '../../../components/Menus/MenuDash'
import { useDashContext } from '../../contexts/DashProvider'

type ProtectedRoutesProps = {
  pathname: string
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ pathname }) => {
  //TODO: Get isAuthenticated from context - useGeneralContext
  const {
    auth: { authenticate },
  } = useDashContext()

  // const isAuthenticated = true

  if (!authenticate) {
    storage.clear()
    return <RedirectRoute pathname={pathname} />
  }

  return (
    <MenuDash>
      <Outlet />
    </MenuDash>
  )
}

export default ProtectedRoutes
