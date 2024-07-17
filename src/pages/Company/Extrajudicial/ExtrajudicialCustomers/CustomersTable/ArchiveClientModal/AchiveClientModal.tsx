import Button from "@/ui/Button"
import Container from "@/ui/Container"
import Modal from "@/ui/Modal"
import Text from "@/ui/Text"

type Props = {
  isVisible: boolean
  onClose: () => void
  onArchiveClients: () => void
  archived: boolean
}

const AchiveClientModal = ({ isVisible, onClose, onArchiveClients, archived }: Props) => {
  return (
    <Modal
      id="modal-archive-client"
      title={!archived ? 'Archivar clientes' : 'Desarchivar clientes'}
      visible={isVisible}
      onClose={onClose}
      size="small"
      footer={
        <Container width="100%" height="75px" display="flex" justifyContent="end" alignItems="center" gap="20px">
          <Button onClick={onArchiveClients} label={!archived ? 'Archivar' : 'Desarchivar'} />
        </Container>
      }
    >
      <Container width="100%" height="50px" display="flex" justify-content="center" alignItems="center" flexDirection="column" textAlign="center">
        <Text.Body size="m" weight="bold" >
          {!archived
            ? '¿Está seguro de que desea archivar los clientes seleccionados?'
            : '¿Está seguro de que desea desarchivar los clientes seleccionados?'}
        </Text.Body>
      </Container>
    </Modal>
  )
}

export default AchiveClientModal