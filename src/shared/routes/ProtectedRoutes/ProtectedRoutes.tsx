import { Outlet } from 'react-router-dom'
import storage from '../../utils/storage'
import RedirectRoute from '../RedirectRoute'
import MenuCompany from '../../../components/Menus/MenuDash'

type ProtectedRoutesProps = {
  pathname: string
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ pathname }) => {
  //TODO: Get isAuthenticated from context - useGeneralContext
  const isAuthenticated = false

  if (!isAuthenticated) {
    storage.clear()
    return <RedirectRoute pathname={pathname} />
  }

  return (
    <MenuCompany>
      <Outlet />
    </MenuCompany>
  )
}

export default ProtectedRoutes
