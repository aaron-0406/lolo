import Container from '@/ui/Container/Container'
import Button from '@/ui/Button/Button'
import useModal from '@/hooks/useModal'
import { useLoloContext } from '@/contexts/LoloProvider'
import AddressTypeModal from '../Modals/AddressTypeModal'

const FuncionariosSearch = () => {
  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const onShowModal = () => {
    showModalAdd()
  }

  const onCloseModal = () => {
    hideModalAdd()
  }

  return (
    <Container display="flex" width="100%" padding=" 0 20px">
      <Button
        shape="round"
        leadingIcon="ri-add-fill"
        size="small"
        onClick={onShowModal}
        disabled={!idCHB}
        permission="P16-01"
      />
      <AddressTypeModal visible={visibleModalAdd} onClose={onCloseModal} />
    </Container>
  )
}

export default FuncionariosSearch
