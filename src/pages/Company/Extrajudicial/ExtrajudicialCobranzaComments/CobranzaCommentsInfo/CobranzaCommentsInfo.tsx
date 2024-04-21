import { useParams } from 'react-router-dom'
import Container from '@/ui/Container/Container'
import Button from '@/ui/Button/Button'
import Breadcrumbs from '@/ui/Breadcrumbs'
import useModal from '@/hooks/useModal'
import { useLoloContext } from '@/contexts/LoloProvider'
import CobranzaCommentsModal from '../Modals/CobranzaCommentsModal/CobranzaCommentsModal'
import paths from 'shared/routes/paths'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import Text from '@/ui/Text'
import styled from 'styled-components'

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
          permission="P02-02-01-01"
          messageTooltip="Agregar comentario"
        />

        {clientId && <CobranzaCommentsModal visible={visibleModalAdd} onClose={onCloseModal} clientId={clientId} />}
      </Container>
    </StyledContainerGeneral>
  )
}

export default CobranzaCommentsInfo

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
