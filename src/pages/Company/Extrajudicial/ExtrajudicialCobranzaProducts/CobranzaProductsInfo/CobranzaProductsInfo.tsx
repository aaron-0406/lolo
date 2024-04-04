import { useLoloContext } from '@/contexts/LoloProvider'
import useModal from '@/hooks/useModal'
import Breadcrumbs from '@/ui/Breadcrumbs'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import { useParams } from 'react-router-dom'
import paths from 'shared/routes/paths'
import CobranzaProductsModal from '../Modals/CobranzaProductsModal'
import { AxiosResponse } from 'axios'
import { NegotiationType } from '@/types/extrajudicial/negotiation.type'
import { useQuery } from 'react-query'
import { getAllNegociacionesByCHB } from '@/services/extrajudicial/negotiation.service'
import notification from '@/ui/notification'

type CobranzaProductsInfoProps = {
  name?: string
  clientId?: number
}

const CobranzaProductsInfo = ({ name, clientId }: CobranzaProductsInfoProps) => {
  const code = useParams().code ?? ''

  const {
    client: { customer },
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const onShowModal = () => {
    showModalAdd()
  }
  const onCloseModal = () => {
    hideModalAdd()
  }

  const routers: LinkType[] = [
    {
      link: paths.cobranza.clientes(customer.urlIdentifier),
      name: 'Clientes',
    },
    {
      link: paths.cobranza.cobranza(customer.urlIdentifier, code),
      name: code,
    },
    {
      link: paths.cobranza.cobranzaProducts(customer.urlIdentifier, code),
      name: 'Productos',
    },
  ]

  const { data: dataNegotiation } = useQuery<AxiosResponse<Array<NegotiationType>, Error>>(
    ['get-all-negotiations-by-chb', idCHB],
    async () => {
      return await getAllNegociacionesByCHB(Number(idCHB))
    },
    {
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const negotiations = dataNegotiation?.data ?? []

  return (
    <Container width="100%" display="flex" justifyContent="space-between" alignItems="center" padding="20px">
      <Breadcrumbs routes={routers} />

      <Container>
        <Button
          onClick={onShowModal}
          disabled={!name}
          width="100px"
          shape="round"
          trailingIcon="ri-add-fill"
          permission="P02-02-07-01"
          messageTooltip="Agregar producto"
        />

        {clientId && (
          <CobranzaProductsModal
            visible={visibleModalAdd}
            onClose={onCloseModal}
            clientId={clientId}
            negotiations={negotiations}
          />
        )}
      </Container>
    </Container>
  )
}

export default CobranzaProductsInfo
