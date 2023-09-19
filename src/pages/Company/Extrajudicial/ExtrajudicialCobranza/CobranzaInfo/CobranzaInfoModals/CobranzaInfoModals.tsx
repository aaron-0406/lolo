import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import useModal from '@/hooks/useModal'
import { ClientType } from '@/types/extrajudicial/client.type'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import ModalAddresses from './ModalAddresses'
import ModalFiadores from './ModalFiadores'
import ModalFiles from './ModalFiles/ModalFiles'
import ModalProducts from './ModalProducts'
import paths from '../../../../../../shared/routes/paths'
import { useLoloContext } from '@/contexts/LoloProvider'

const CobranzaInfoModals = () => {
  const {
    client: {
      customer: { urlIdentifier },
    },
  } = useLoloContext()

  const navigate = useNavigate()

  const { getValues, watch } = useFormContext<ClientType>()

  const { visible: visibleModalFiadores, showModal: showModalFiadores, hideModal: hideModalFiadores } = useModal()

  const { visible: visibleModalAddresses, showModal: showModalAddresses, hideModal: hideModalAddresses } = useModal()

  const { visible: visibleModalFiles, showModal: showModalFiles, hideModal: hideModalFiles } = useModal()

  const { visible: visibleModalProducts, showModal: showModalProducts, hideModal: hideModalProducts } = useModal()

  const clientId = getValues('id')
  const code = watch('code')

  const onClickComment = () => {
    navigate(`${paths.cobranza.cobranzaComments(urlIdentifier, code)}`)
  }

  return (
    <Container width="100%" height="100%" display="flex" flexDirection="row" gap="10px">
      <Button width="150px" label="Comentarios" disabled={!clientId} onClick={onClickComment} permission="P03-01" />
      <Button width="150px" label="Archivos" disabled={!clientId} onClick={showModalFiles} permission="P03-06" />
      <Button width="150px" label="Fiadores" disabled={!clientId} onClick={showModalFiadores} permission="P03-07" />
      <Button width="150px" label="Direcciones" disabled={!clientId} onClick={showModalAddresses} permission="P03-08" />
      <Button width="150px" label="Productos" disabled={!clientId} onClick={showModalProducts} permission="P03-09" />

      <Modal
        id="modal-fiadores"
        title="Fiadores"
        visible={visibleModalFiadores}
        onClose={hideModalFiadores}
        contentOverflowY="auto"
      >
        <ModalFiadores clientId={clientId} />
      </Modal>
      <Modal
        id="modal-files"
        title="Archivos"
        visible={visibleModalFiles}
        onClose={hideModalFiles}
        contentOverflowY="auto"
      >
        <ModalFiles clientId={clientId} code={Number(code)} />
      </Modal>

      <Modal id="modal-addresses" title="Direcciones" visible={visibleModalAddresses} onClose={hideModalAddresses}>
        <Container
          display="flex"
          flexDirection="column"
          position="relative"
          overFlowY="auto"
          height="100%"
          width="100%"
        >
          <ModalAddresses clientId={clientId} />
        </Container>
      </Modal>
      <Modal id="modal-products" title="Productos" visible={visibleModalProducts} onClose={hideModalProducts}>
        <Container
          display="flex"
          flexDirection="column"
          position="relative"
          overFlowY="auto"
          height="100%"
          width="100%"
        >
          <ModalProducts clientCode={code} />
        </Container>
      </Modal>
    </Container>
  )
}

export default CobranzaInfoModals
