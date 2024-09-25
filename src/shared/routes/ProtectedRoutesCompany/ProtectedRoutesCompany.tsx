import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import MenuCompany from '../../../components/Menus/MenuCompany'
import { useLoloContext } from '@/contexts/LoloProvider'
import { getCustomerByUrl } from '@/services/dash/customer.service'
import { CustomerType } from '@/types/dash/customer.type'
import storage from '../../utils/storage'
import { GuestParamsType } from '../GuestRoutesCompany/GuestRoutesCompany.interfaces'
import RedirectRoute from '../RedirectRoute'
import paths from '../paths'

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
  const location = useLocation()
  const currentPath = location.pathname
  const { urlIdentifier, code, id, relatedProcessCode, collateralCode, auctionCode, binnacleCode } = useParams<GuestParamsType>()

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

  const hasAccessToTheRoute = useMemo(() => {
    const permittedRoutes =
      user.permissions?.map((permission) =>
        permission.link
          .replace(':urlIdentifier', urlIdentifier + '')
          .replace(':code', code ?? '')
          .replace(':id', id ?? '')
          .replace(':relatedProcessCode', relatedProcessCode ?? '')
          .replace(':collateralCode', collateralCode ?? '') 
          .replace(':auctionCode', auctionCode ?? '')
          .replace(':binnacleCode', binnacleCode ?? '')
      ) ?? []
    return permittedRoutes.includes(currentPath)
  }, [user.permissions, currentPath, urlIdentifier, code, id, relatedProcessCode, collateralCode, auctionCode, binnacleCode])

  useEffect(() => {
    setIsLoading(true)
    refetch()
    // eslint-disable-next-line
  }, [])

  if (!authenticate) {
    storage.clear()
    return <RedirectRoute pathname={pathname.replace(':urlIdentifier', urlIdentifier + '')} />
  }

  if (isLoading) return <div>Loading</div>

  if (!isLoading && !hasAccessToTheRoute) {
    return <RedirectRoute pathname={paths.general.unauthorized} />
  }

  if (isError) return <div>Pagina no encontrada</div>

  return (
    <MenuCompany urlIdentifier={urlIdentifier ?? ''}>
      <Outlet />
    </MenuCompany>
  )
}

export default ProtectedRoutesCompany
