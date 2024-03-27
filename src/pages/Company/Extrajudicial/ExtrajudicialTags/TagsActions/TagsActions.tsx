import useModal from '@/hooks/useModal'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Text from '@/ui/Text'
import CobranzaTagsModal from '../Modals/CobranzaTagsModal'
import { useLoloContext } from '@/contexts/LoloProvider'

const TagsActions = () => {
  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const handleClickModal = () => {
    hideModalAdd()
  }

  const handleClickButton = () => {
    showModalAdd()
  }

  return (
    <Container
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="row"
      padding="20px"
    >
      <Container>
        <Text.Body size="m" weight="bold" className="label__text">
          LISTA DE ETIQUETAS
        </Text.Body>
      </Container>
      <Container>
        <Button
          disabled={!idCHB}
          onClick={handleClickButton}
          messageTooltip="Agregar etiqueta"
          trailingIcon="ri-add-fill"
          shape="round"
          permission="P14-01"
        />
        <CobranzaTagsModal visible={visibleModalAdd} onClose={handleClickModal} />
      </Container>
    </Container>
  )
}

export default TagsActions
