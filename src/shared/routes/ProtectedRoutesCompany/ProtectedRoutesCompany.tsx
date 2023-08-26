import { useQuery } from 'react-query'
import { Outlet, useParams } from 'react-router-dom'
import MenuCompany from '../../../components/Menus/MenuCompany'
import { useLoloContext } from '@/contexts/LoloProvider'
import { getCustomerByUrl } from '@/services/dash/customer.service'
import { CustomerType } from '@/types/dash/customer.type'
import storage from '../../utils/storage'
import { GuestParamsType } from '../GuestRoutesCompany/GuestRoutesCompany.interfaces'
import RedirectRoute from '../RedirectRoute'
import { useEffect, useState } from 'react'

type ProtectedRoutesCompanyProps = {
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

const ProtectedRoutesCompany: React.FC<ProtectedRoutesCompanyProps> = ({ pathname }) => {
  const { urlIdentifier } = useParams<GuestParamsType>()
  const {
    auth: { authenticate, setAuthenticate },
    client: { setCustomer },
    customerUser: { user },
  } = useLoloContext()

  const [isLoading, setIsLoading] = useState(true)

  const { isError, refetch } = useQuery(
    'query-customer',
    async () => {
      return await getCustomerByUrl(urlIdentifier ?? '')
    },
    {
      enabled: false,
      onSuccess: (response) => {
        setCustomer(response.data)

        if (user.customerId !== response.data.id && user.customerId !== 0) {
          setCustomer(initialCustomerState)
          setAuthenticate(false)
          storage.clear()
          return <RedirectRoute pathname={pathname.replace(':urlIdentifier', urlIdentifier + '')} />
        }

        setIsLoading(false)
      },
      onError: () => {
        setIsLoading(false)
      },
    }
  )

  useEffect(() => {
    setIsLoading(true)
    refetch()
    // eslint-disable-next-line
  }, [])

  //TODO: Get isAuthenticated from context - useGeneralContext

  if (!authenticate) {
    storage.clear()
    return <RedirectRoute pathname={pathname.replace(':urlIdentifier', urlIdentifier + '')} />
  }

  if (isLoading) return <div>Loading</div>

  if (isError) return <div>Pagina no encontrada</div>

  return (
    <MenuCompany urlIdentifier={urlIdentifier ?? ''}>
      <Outlet />
    </MenuCompany>
  )
}

export default ProtectedRoutesCompany
