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

  const clientId = getValues('id')
  const code = watch('code')

  const onClickComment = () => {
    navigate(`${paths.cobranza.cobranzaComments(urlIdentifier, code)}`)
  }

  const onClickContact = () => {
    navigate(`${paths.cobranza.cobranzaContacts(urlIdentifier, code)}`)
  }

  const onClickProduct = () => {
    navigate(`${paths.cobranza.cobranzaProducts(urlIdentifier, code)}`)
  }

  return (
    <Container width="100%" height="100%" display="flex" flexDirection="row" gap="10px">
      <Button
        trailingIcon="ri-discuss-line"
        width="170px"
        label="Comentarios"
        disabled={!clientId}
        onClick={onClickComment}
        permission="P02-02-01"
      />
      <Button
        trailingIcon="ri-customer-service-2-line"
        width="150px"
        label="Contactos"
        disabled={!clientId}
        onClick={onClickContact}
        permission="P02-02-07"
      />
      <Button
        trailingIcon="ri-file-line"
        width="150px"
        label="Archivos"
        disabled={!clientId}
        onClick={showModalFiles}
        permission="P02-02-03"
      />
      <Button
        trailingIcon="ri-group-line"
        width="150px"
        label="Fiadores"
        disabled={!clientId}
        onClick={showModalFiadores}
        permission="P02-02-04"
      />
      <Button
        trailingIcon="ri-map-pin-user-line"
        width="160px"
        label="Direcciones"
        disabled={!clientId}
        onClick={showModalAddresses}
        permission="P02-02-05"
      />
      <Button
        trailingIcon="ri-bank-card-line"
        width="150px"
        label="Productos"
        disabled={!clientId}
        onClick={onClickProduct}
        permission="P02-02-06"
      />

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
    </Container>
  )
}

export default CobranzaInfoModals
