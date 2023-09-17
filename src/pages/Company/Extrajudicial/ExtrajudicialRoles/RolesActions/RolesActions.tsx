import useModal from '@/hooks/useModal'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import RolesModal from '../Modals/RolesModal'
import { useLoloContext } from '@/contexts/LoloProvider'

const RolesActions = () => {
  const {
    client: { customer },
  } = useLoloContext()

  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  return (
    <Container display="flex" justifyContent="end" width="100%" padding="20px 20px 0px 20px">
      <Button
        disabled={!customer.id}
        onClick={showModalAdd}
        leadingIcon="ri-add-fill"
        shape="round"
        size="small"
        permission="P11-01"
      />

      <RolesModal visible={visibleModalAdd} onClose={hideModalAdd} />
    </Container>
  )
}

export default RolesActions
