import { useDashContext } from '@/contexts/DashProvider'
import useModal from '@/hooks/useModal'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import RolesModal from '../Modals/RolesModal'

const RolesActions = () => {
  const {
    dashCustomer: { selectedCustomer },
  } = useDashContext()

  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  return (
    <Container display="flex" justifyContent="end" width="100%" padding="20px 20px 0px 20px">
      <Button
        disabled={!selectedCustomer.id}
        onClick={showModalAdd}
        leadingIcon="ri-add-fill"
        shape="round"
        size="small"
      />

      <RolesModal visible={visibleModalAdd} onClose={hideModalAdd} />
    </Container>
  )
}

export default RolesActions
