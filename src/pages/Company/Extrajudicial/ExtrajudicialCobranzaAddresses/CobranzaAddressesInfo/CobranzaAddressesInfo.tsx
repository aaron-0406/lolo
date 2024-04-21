import { useLoloContext } from '@/contexts/LoloProvider'
import useModal from '@/hooks/useModal'
import Breadcrumbs from '@/ui/Breadcrumbs'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import { useParams } from 'react-router-dom'
import paths from 'shared/routes/paths'
import CobranzaAddressesModal from '../Modals/CobranzaAddressesModal'
import styled from 'styled-components'
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
    <StyledContainerGeneral>
      <Container display="flex" flexDirection="column" gap="15px">
        <Breadcrumbs routes={routers} />
        <StyledContainer>
          <Text.Body size="l" weight="bold">
            {name}
          </Text.Body>
        </StyledContainer>
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
    </StyledContainerGeneral>
  )
}

export default CobranzaAddressesInfo

const StyledContainerGeneral = styled(Container)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
`
const StyledContainer = styled(Container)`
  padding-left: 20px;
`
