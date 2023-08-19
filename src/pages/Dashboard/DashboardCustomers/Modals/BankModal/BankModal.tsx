import Container from '../../../../../ui/Container'
import Modal from '../../../../../ui/Modal'
import BankActions from './BankActions'
import BankNoSelected from './BankNoSelected'
import BankSelected from './BankSelected'

type CustomersModalProps = {
  visible: boolean
  onClose: () => void
}

const BankModal = ({ visible, onClose }: CustomersModalProps) => {
  const handleClickCloseModal = () => {
    onClose()
  }

  return (
    <Modal
      size="large"
      visible={visible}
      onClose={handleClickCloseModal}
      id="modal-bank"
      title="Bancos"
      contentOverflowY="auto"
    >
      <Container width="100%" padding="20px" display="flex">
        <BankSelected />
        <BankActions />
        <BankNoSelected />
      </Container>
    </Modal>
  )
}

export default BankModal
