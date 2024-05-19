import Modal from '@/ui/Modal'
import Container  from '@/ui/Container'
import Button from '@/ui/Button';
import Text from '@/ui/Text';

type DeleteScheduledNotificationsModalProps = {
  visible: boolean
  onClose: () => void
  onDelete: () => void
}

const DeleteScheduledNotificationsModal = ( { visible, onClose, onDelete }: DeleteScheduledNotificationsModalProps ) => {
  return (
    <Modal
      visible={visible}
      onClose={onClose}
      size="small"
      title="Eliminar notificación"
      id="modal-delete-scheduled-notifications"
      footer={
        <Container width="100%" display="flex" justifyContent="end" gap="10px">
          <Button
            onClick={onClose}
            label="Cerrar"
            messageTooltip="CANCELAR"
          />
          <Button
            display='danger'
            onClick={onDelete}
            label="Eliminar"
            messageTooltip="ELIMINAR"
          />
        </Container>
      }
    >
      <Container
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap="20px"
        height="100px"
        padding="0px 10px 0px 10px"  
        textAlign='center'
      >
        <Text.Body size="l" weight="bold" color="Primary5">
          ¿Está seguro de que desea eliminar la notificación?
        </Text.Body>
        </Container> 
    </Modal>
  )
}

export default DeleteScheduledNotificationsModal