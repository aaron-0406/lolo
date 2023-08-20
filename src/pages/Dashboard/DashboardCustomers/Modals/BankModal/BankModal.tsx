import { useState } from 'react'
import Container from '../../../../../ui/Container'
import Modal from '../../../../../ui/Modal'
import BankActions from './BankActions'
import BankNoSelected from './BankNoSelected'
import BankSelected from './BankSelected'
import { BankType } from '../../../../../shared/types/bank.type'

type CustomersModalProps = {
  visible: boolean
  onClose: () => void
}

const BankModal = ({ visible, onClose }: CustomersModalProps) => {
  const handleClickCloseModal = () => {
    onClose()
  }

  const defaultValuesBank = {
    id: 0,
    name: '',
    state: false,
    createdAt: new Date(),
    CUSTOMER_HAS_BANK: {
      id: 0,
      idCustomer: 0,
      idBank: 0,
    },
  }

  const [bankSelected, setBankSelected] = useState<BankType>(defaultValuesBank)

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
        <BankSelected
          setGlobalBank={(bank: BankType) => {
            setBankSelected(bank)
          }}
        />
        <BankActions bankSelected={bankSelected} />
        <BankNoSelected
          setGlobalBank={(bank: BankType) => {
            setBankSelected(bank)
          }}
        />
      </Container>
    </Modal>
  )
}

export default BankModal
