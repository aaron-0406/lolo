import { useParams } from 'react-router-dom'
import useModal from '@/hooks/useModal'
import Breadcrumbs from '@/ui/Breadcrumbs'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Text from '@/ui/Text'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import JudiciaObservationModal from '../Modals/ObservationModal'
import paths from 'shared/routes/paths'
import { useLoloContext } from '@/contexts/LoloProvider'

type JudicialObservationInfoProps = {
  judicialFileCaseId: number
  clientName: string
  clientCode: string
}

const JudicialObservationInfo = ({ judicialFileCaseId, clientName, clientCode }: JudicialObservationInfoProps) => {
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
      link: paths.judicial.expedientes(customer.urlIdentifier),
      name: 'Expedientes',
    },
    {
      link: paths.judicial.detallesExpediente(customer.urlIdentifier, code),
      name: code,
    },
    {
      link: paths.judicial.observacion(customer.urlIdentifier, code),
      name: 'Observación',
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
        <Container padding="0 20px 0 20px" backgroundColor="#e5e7eb">
          <Text.Body size="m" weight="bold">
            {clientName}
          </Text.Body>
        </Container>
      </Container>

      <Container>
        <Button
          onClick={onShowModal}
          width="100px"
          shape="round"
          trailingIcon="ri-add-fill"
          permission="P13-01-02-01"
          messageTooltip="Agregar Observación"
        />

        {judicialFileCaseId && (
          <JudiciaObservationModal
            clientCode={clientCode}
            visible={visibleModalAdd}
            onClose={onCloseModal}
            judicialFileCaseId={judicialFileCaseId}
          />
        )}
      </Container>
    </Container>
  )
}

export default JudicialObservationInfo
