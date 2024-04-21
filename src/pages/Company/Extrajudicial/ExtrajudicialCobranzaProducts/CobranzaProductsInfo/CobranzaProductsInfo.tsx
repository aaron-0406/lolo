import { useLoloContext } from '@/contexts/LoloProvider'
import useModal from '@/hooks/useModal'
import Breadcrumbs from '@/ui/Breadcrumbs'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import { useParams } from 'react-router-dom'
import paths from 'shared/routes/paths'
import CobranzaProductsModal from '../Modals/CobranzaProductsModal'
import styled from 'styled-components'
import Text from '@/ui/Text'

type CobranzaProductsInfoProps = {
  name?: string
  clientId?: number
}

const CobranzaProductsInfo = ({ name, clientId }: CobranzaProductsInfoProps) => {
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
      link: paths.cobranza.cobranzaProducts(customer.urlIdentifier, code),
      name: 'Productos',
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
          permission="P02-02-07-01"
          messageTooltip="Agregar producto"
        />

        {clientId && <CobranzaProductsModal visible={visibleModalAdd} onClose={onCloseModal} clientId={clientId} />}
      </Container>
    </StyledContainerGeneral>
  )
}

export default CobranzaProductsInfo

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
