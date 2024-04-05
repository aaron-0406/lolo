import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Text from '@/ui/Text'
import useModal from '@/hooks/useModal'

const OfficeActions = () => {
  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const handleClickModal = () => {
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
      justifyContent="space-between"
      flexDirection="row"
      padding="20px"
    >
      <Container>
        <Text.Body size="m" weight="bold" className="label__text">
          OFICINAS
        </Text.Body>
      </Container>

      <Container>
        <Button
          onClick={handleClickModal}
          messageTooltip="Agregar Nueva Oficina"
          leadingIcon="ri-add-fill"
          shape="round"
          permission="P15-01"
        />
        {/* <IpAddressBankModal visible={visibleModalAdd} onClose={onCloseModal} /> */}
      </Container>
    </Container>
  )
}

export default OfficeActions
