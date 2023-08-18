import Container from '../../../../../ui/Container'
import Modal from '../../../../../ui/Modal'
import { useDashContext } from '../../../../../shared/contexts/DashProvider'
import BankActions from './BankActions'
import BankNoSelected from './BankNoSelected'
import BankSelected from './BankSelected'

type CustomersModalProps = {
  visible: boolean
  onClose: () => void
}

const BankModal = ({ visible, onClose }: CustomersModalProps) => {
  const {
    dashCustomer: { selectedCustomer },
  } = useDashContext()

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
      <Container width="100%" padding="20px" display="flex" justifyContent="space-between" gap="20px">
        <BankSelected />
        <BankActions />
        <BankNoSelected />
      </Container>
    </Modal>
  )
}

export default BankModal
