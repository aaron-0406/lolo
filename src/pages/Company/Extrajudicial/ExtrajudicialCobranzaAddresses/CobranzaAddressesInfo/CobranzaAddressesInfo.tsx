import { useLoloContext } from '@/contexts/LoloProvider'
import useModal from '@/hooks/useModal'
import Breadcrumbs from '@/ui/Breadcrumbs'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import { useParams } from 'react-router-dom'
import paths from 'shared/routes/paths'
import CobranzaAddressesModal from '../Modals/CobranzaAddressesModal'
import Text from '@/ui/Text'

type CobranzaAddressesInfoProps = {
  name?: string
  clientId?: number
}

const CobranzaAddressesInfo = ({ name, clientId }: CobranzaAddressesInfoProps) => {
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
      link: paths.cobranza.cobranzaAddresses(customer.urlIdentifier, code),
      name: 'Direcciones',
    },
  ]

  return (
    <Container
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="20px 20px 0 20px"
    >
      <Container display="flex" flexDirection="column" gap="15px">
        <Breadcrumbs routes={routers} />
        <Container padding="10px" width="100%" margin="0px" backgroundColor="#eff0f6ff">
          <Text.Body size="m" weight="bold">
            {name ?? '-'}
          </Text.Body>
        </Container>
      </Container>

      <Container>
        <Button
          onClick={onShowModal}
          disabled={!name}
          width="100px"
          shape="round"
          trailingIcon="ri-add-fill"
          permission="P02-02-05-01"
          messageTooltip="Agregar dirección"
        />

        {clientId && <CobranzaAddressesModal visible={visibleModalAdd} onClose={onCloseModal} clientId={clientId} />}
      </Container>
    </Container>
  )
}

export default CobranzaAddressesInfo
