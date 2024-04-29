import Breadcrumbs from '@/ui/Breadcrumbs'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import JudicialBinnacleModal from '../Modals/JudicialBinnacleModal'
import paths from 'shared/routes/paths'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useParams } from 'react-router-dom'
import useModal from '@/hooks/useModal'

type JudicialBinnacleInfoProps = {
  judicialFileCaseId: number
  clientCode: string
}

const JudicialBinnacleInfo = ({ judicialFileCaseId, clientCode }: JudicialBinnacleInfoProps) => {
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
      link: paths.judicial.bitacora(customer.urlIdentifier, code),
      name: 'Bitacora',
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
          permission="P02-02-01-01"
          messageTooltip="Agregar comentario"
        />

        {judicialFileCaseId && (
          <JudicialBinnacleModal
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

export default JudicialBinnacleInfo
