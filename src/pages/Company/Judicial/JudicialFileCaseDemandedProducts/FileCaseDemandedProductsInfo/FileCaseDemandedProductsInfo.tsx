import { useLoloContext } from '@/contexts/LoloProvider'
import useModal from '@/hooks/useModal'
import Breadcrumbs from '@/ui/Breadcrumbs'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Text from '@/ui/Text'
import { useParams } from 'react-router-dom'
import paths from 'shared/routes/paths'
import AssignDemandedProductsModal from '../Modals/AssignDemandedProductsModal'

type FileCaseDemandedProductsInfoProps = {
  clientId?: number
  clientName?: string
  caseFileId?: number
}

const FileCaseDemandedProductsInfo = ({ clientId, clientName, caseFileId }: FileCaseDemandedProductsInfoProps) => {
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
      link: paths.judicial.productosDemandados(customer.urlIdentifier, code),
      name: 'Productos demandados',
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
            {clientName ?? '-'}
          </Text.Body>
        </Container>
      </Container>

      <Container>
        <Button
          onClick={onShowModal}
          disabled={!clientName}
          width="100px"
          shape="round"
          trailingIcon="ri-add-fill"
          permission="P13-01-03-02"
          messageTooltip="Asignar productos demandados"
        />

        {caseFileId && (
          <AssignDemandedProductsModal
            visible={visibleModalAdd}
            onClose={onCloseModal}
            clientId={clientId}
            judicialCaseFileId={caseFileId}
          />
        )}
      </Container>
    </Container>
  )
}

export default FileCaseDemandedProductsInfo
