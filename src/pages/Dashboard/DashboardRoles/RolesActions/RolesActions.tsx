import useModal from '../../../../shared/hooks/useModal'
import Button from '../../../../ui/Button'
import Container from '../../../../ui/Container'
import RolesModal from '../Modals/RolesModal'

const RolesActions = () => {
  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()
  return (
    <Container display="flex" justifyContent="end" width="100%" padding="20px 20px 0px 20px">
      <Button shape="round" leadingIcon="ri-add-fill" size="small" onClick={showModalAdd} />
      <RolesModal visible={visibleModalAdd} onClose={hideModalAdd} />
    </Container>
  )
}

export default RolesActions
