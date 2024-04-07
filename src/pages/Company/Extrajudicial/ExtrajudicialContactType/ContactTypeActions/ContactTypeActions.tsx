import Container from '@/ui/Container/Container'
import Button from '@/ui/Button/Button'
import useModal from '@/hooks/useModal'
import Text from '@/ui/Text'
import { useLoloContext } from '@/contexts/LoloProvider'
import ContactTypeModal from '../Modals/ContactTypeModal'

const ContactTypeActions = () => {
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
          TIPO DE CONTACTOS
        </Text.Body>
      </Container>

      <Container>
        <Button
          onClick={onShowModal}
          messageTooltip="Agregar Tipo de Contacto"
          leadingIcon="ri-add-fill"
          shape="round"
          disabled={!idCHB}
          permission="P18-01"
        />
      </Container>
      <ContactTypeModal visible={visibleModalAdd} onClose={onCloseModal} />
    </Container>
  )
}

export default ContactTypeActions
