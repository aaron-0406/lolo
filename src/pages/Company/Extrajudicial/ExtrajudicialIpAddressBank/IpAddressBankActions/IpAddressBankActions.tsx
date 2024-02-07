import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Text from '@/ui/Text'
import useModal from '@/hooks/useModal'
import IpAddressBankModal from '../Modals/IpAddressBankModal'

const IpAddressBankActions = () => {
  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const handleClickModal = () => {
    showModalAdd()
  }

  const onCloseModal = () => {
    hideModalAdd()
  }

  return (
    <Container width="100%" display="flex" padding="20px" alignItems="center" justifyContent="space-between">
      <Text.Body size="m" weight="bold">
        BANCO DE DIRECCIONES IP
      </Text.Body>
      <Button onClick={handleClickModal} leadingIcon="ri-add-fill" shape="round" size="small" permission="P15-01" />

      <IpAddressBankModal visible={visibleModalAdd} onClose={onCloseModal} />
    </Container>
  )
}

export default IpAddressBankActions
