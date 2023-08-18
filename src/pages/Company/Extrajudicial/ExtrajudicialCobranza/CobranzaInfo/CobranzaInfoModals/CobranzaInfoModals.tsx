import { useFormContext } from 'react-hook-form'
import useModal from '../../../../../../shared/hooks/useModal'
import { ClientType } from '../../../../../../shared/types/extrajudicial/client.type'
import Button from '../../../../../../ui/Button'
import Container from '../../../../../../ui/Container'
import Modal from '../../../../../../ui/Modal'
import ModalAddresses from './ModalAddresses'
import ModalFiadores from './ModalFiadores'
import ModalFiles from './ModalFiles/ModalFiles'
import ModalProducts from './ModalProducts'

const CobranzaInfoModals = () => {
  const { getValues, watch } = useFormContext<ClientType>()

  const { visible: visibleModalFiadores, showModal: showModalFiadores, hideModal: hideModalFiadores } = useModal()

  const { visible: visibleModalAddresses, showModal: showModalAddresses, hideModal: hideModalAddresses } = useModal()

  const { visible: visibleModalFiles, showModal: showModalFiles, hideModal: hideModalFiles } = useModal()

  const { visible: visibleModalProducts, showModal: showModalProducts, hideModal: hideModalProducts } = useModal()

  const clientId = getValues('id')
  const code = watch('code')

  return (
    <div className="fields-wrapper-container-t">
      <Button
        width="100%"
        label="Archivos"
        trailingIcon="ri-archive-drawer-line"
        disabled={!clientId}
        onClick={showModalFiles}
      />
      <Button width="100%" label="Fiadores" disabled={!clientId} onClick={showModalFiadores} />
      <Button width="100%" label="Direcciones" disabled={!clientId} onClick={showModalAddresses} />
      <Button width="100%" label="Productos" disabled={!clientId} onClick={showModalProducts} />

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
    </div>
  )
}

export default CobranzaInfoModals
