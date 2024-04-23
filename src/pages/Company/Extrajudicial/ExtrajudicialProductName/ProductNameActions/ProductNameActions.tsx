import Container from '@/ui/Container/Container'
import Button from '@/ui/Button/Button'
import useModal from '@/hooks/useModal'
import Text from '@/ui/Text'
import { useLoloContext } from '@/contexts/LoloProvider'
import ProductNameModal from '../Modals/ProductNameModal'

const ProductNameActions = () => {
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
          NOMBRES DE PRODUCTOS
        </Text.Body>
      </Container>

      <Container>
        <Button
          onClick={onShowModal}
          messageTooltip="Agregar Nombre de Producto"
          leadingIcon="ri-add-fill"
          shape="round"
          disabled={!idCHB}
          permission="P19-01"
        />
      </Container>
      <ProductNameModal visible={visibleModalAdd} onClose={onCloseModal} />
    </Container>
  )
}

export default ProductNameActions
