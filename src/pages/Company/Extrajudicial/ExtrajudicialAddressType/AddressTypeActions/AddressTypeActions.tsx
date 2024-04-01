import Container from '@/ui/Container/Container'
import Button from '@/ui/Button/Button'
import useModal from '@/hooks/useModal'
import Text from '@/ui/Text'
import { useLoloContext } from '@/contexts/LoloProvider'
import AddressTypeModal from '../Modals/AddressTypeModal'

const AddressTypeActions = () => {
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
    <Container
      width="100%"
      display="flex"
      alignItems="center"
      flexDirection="row"
      padding="20px"
      justifyContent="space-between"
    >
      <Container>
        <Text.Body size="m" weight="bold" className="label__text">
          TIPO DE DIRECCIONES
        </Text.Body>
      </Container>

      <Container>
        <Button
          onClick={onShowModal}
          messageTooltip="Agregar Tipo de Dirección"
          leadingIcon="ri-add-fill"
          shape="round"
          disabled={!idCHB}
          permission="P16-01"
        />
      </Container>
      <AddressTypeModal visible={visibleModalAdd} onClose={onCloseModal} />
    </Container>
  )
}

export default AddressTypeActions
