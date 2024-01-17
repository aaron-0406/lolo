import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import useModal from '@/hooks/useModal'
import { ClientType } from '@/types/extrajudicial/client.type'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import ModalFiadores from './ModalFiadores'
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

  const onClickAddress = () => {
    navigate(`${paths.cobranza.cobranzaAddresses(urlIdentifier, code)}`)
  }

  const onClickFile = () => {
    navigate(`${paths.cobranza.cobranzaFiles(urlIdentifier, code)}`)
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
        onClick={onClickFile}
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
        onClick={onClickAddress}
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
    </Container>
  )
}

export default CobranzaInfoModals
