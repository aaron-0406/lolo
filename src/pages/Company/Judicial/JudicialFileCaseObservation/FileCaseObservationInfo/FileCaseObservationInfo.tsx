import { useParams } from 'react-router-dom'
import useModal from '@/hooks/useModal'
import Breadcrumbs from '@/ui/Breadcrumbs'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import JudiciaObservationModal from '../Modals/ObservationModal'
import paths from 'shared/routes/paths'
import { useLoloContext } from '@/contexts/LoloProvider'

type JudicialObservationInfoProps = {
  judicialFileCaseId: number
  clientCode: string
}

const JudicialObservationInfo = ({ judicialFileCaseId, clientCode }: JudicialObservationInfoProps) => {
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
      <Container display="flex" flexDirection="column" gap="10px">
        <Breadcrumbs routes={routers} />
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
