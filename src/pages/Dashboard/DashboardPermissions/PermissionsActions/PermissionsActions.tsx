import useModal from '../../../../shared/hooks/useModal'
import Button from '../../../../ui/Button/Button'
import Container from '../../../../ui/Container/Container'
import PermissionModal from '../Modals/PermissionModal'

const PermissionsActions = () => {
  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  return (
    <Container display="flex" justifyContent="end" width="100%" padding="20px 20px 0px 20px">
      <Button shape="round" leadingIcon="ri-add-fill" size="small" onClick={showModalAdd} />
      <PermissionModal visible={visibleModalAdd} onClose={hideModalAdd} />
    </Container>
  )
}

export default PermissionsActions
