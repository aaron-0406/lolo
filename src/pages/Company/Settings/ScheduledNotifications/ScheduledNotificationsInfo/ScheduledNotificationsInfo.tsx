import useModal from '@/hooks/useModal'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import AssignScheduledNotificationsModal from '../Modals/AssignScheduledNotificationsModal'



const ScheduledNotificationsInfo = () => {

  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()
  
  const onShowModal = () => {
    showModalAdd()
  }
  const onCloseModal = () => {
    hideModalAdd()
  }


  return (
    <Container
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="20px 20px 0 20px"
    >
      <Container width="100%" display="flex" flexDirection="row" gap="10px" justifyContent="end">
        <Button
          onClick={onShowModal}
          width="100px"
          shape="round"
          trailingIcon="ri-add-fill"
          permission="P29-01"
          messageTooltip="Asignar notificaciones"
        />

        {visibleModalAdd ? (
          <AssignScheduledNotificationsModal visible={visibleModalAdd} onClose={onCloseModal} modalActions='add'/>
        ) : null}
      </Container>
    </Container>
  )
}

export default ScheduledNotificationsInfo
