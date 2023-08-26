import { useQuery } from 'react-query'
import { Outlet, useParams } from 'react-router-dom'
import { useLoloContext } from '@/contexts/LoloProvider'
import { getCustomerByUrl } from '@/services/dash/customer.service'
import { CustomerType } from '@/types/dash/customer.type'
import storage from '../../utils/storage'
import { GuestParamsType } from '../GuestRoutesCompany/GuestRoutesCompany.interfaces'
import RedirectRoute from '../RedirectRoute'

type ProtectedRoutesCompanyDashProps = {
  pathname: string
}

const initialCustomerState: CustomerType = {
  id: 0,
  ruc: '',
  companyName: '',
  urlIdentifier: '',
  state: false,
  customerBanks: [],
}

const ProtectedRoutesCompanyDash: React.FC<ProtectedRoutesCompanyDashProps> = ({ pathname }) => {
  const { urlIdentifier } = useParams<GuestParamsType>()
  const {
    auth: { setAuthenticate },
    client: { customer, setCustomer },
    customerUser: { user },
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

  //TODO: Get isAuthenticated from context - useGeneralContext

  if (user.customerId !== customer.id && user.customerId !== 0) {
    setCustomer(initialCustomerState)
    setAuthenticate(false)
    storage.clear()
    return <RedirectRoute pathname={pathname.replace(':urlIdentifier', urlIdentifier + '')} />
  }

  if (user.privilege !== 'EDITOR') {
    return <RedirectRoute pathname={pathname.replace(':urlIdentifier', urlIdentifier + '')} />
  }

  if (isLoading) return <div>Loading</div>

  if (isError) return <div>Pagina no encontrada</div>

  return <Outlet />
}

export default ProtectedRoutesCompanyDash
