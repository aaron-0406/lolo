import { useQuery } from 'react-query'
import { useParams, Outlet } from 'react-router-dom'
import { useLoloContext } from '../../contexts/LoloProvider'
import { getCustomerByUrl } from '../../services/customer.service'
import paths from '../paths'
import RedirectRoute from '../RedirectRoute'
import { GuestParamsType } from './GuestRoutesCompany.interfaces'

type GuestRouteCompanyProps = {
  pathname: string
}

const GuestRouteCompany: React.FC<GuestRouteCompanyProps> = ({ pathname }) => {
  const { urlIdentifier } = useParams<GuestParamsType>()
  const {
    auth: { authenticate },
    client: { setCustomer },
  } = useLoloContext()

  const { isLoading, isError } = useQuery(
    'query-customer',
    async () => {
      return await getCustomerByUrl(urlIdentifier ?? '')
    },
    {
      onSuccess: (response) => {
        setCustomer(response.data)
      },
    }
  )

  if (authenticate) {
    return <RedirectRoute pathname={pathname.replace(':urlIdentifier', urlIdentifier + '')} />
  }

  if (!urlIdentifier) {
    return <RedirectRoute pathname={paths.general.notFound} />
  }

  if (isLoading) return <div>Loading</div>

  if (isError) return <div>Pagina no encontrada</div>

  //TODO: Get isAuthenticated from context - useGeneralContext

  return (
    <div className="login-provider">
      <Outlet />
    </div>
  )
}

export default GuestRouteCompany
