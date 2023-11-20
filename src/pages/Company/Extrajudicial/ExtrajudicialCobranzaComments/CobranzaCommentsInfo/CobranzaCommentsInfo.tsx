import { useParams } from 'react-router-dom'
import Container from '@/ui/Container/Container'
import Button from '@/ui/Button/Button'
import Breadcrumbs from '@/ui/Breadcrumbs'
import useModal from '@/hooks/useModal'
import { useLoloContext } from '@/contexts/LoloProvider'
import CobranzaCommentsModal from '../Modals/CobranzaCommentsModal/CobranzaCommentsModal'
import paths from 'shared/routes/paths'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'

type CobranzaCommentsInfoProps = {
  name?: string
  clientId?: number
}

const CobranzaCommentsInfo = ({ name, clientId }: CobranzaCommentsInfoProps) => {
  const code = useParams().code ?? ''

  const {
    client: { customer },
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
      link: paths.cobranza.cobranzaComments(customer.urlIdentifier, code),
      name: 'Comentarios',
    },
  ]

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
          permission="P02-02-01-01"
          messageTooltip="Agregar comentario"
        />

        {clientId && <CobranzaCommentsModal visible={visibleModalAdd} onClose={onCloseModal} clientId={clientId} />}
      </Container>
    </Container>
  )
}

export default CobranzaCommentsInfo
