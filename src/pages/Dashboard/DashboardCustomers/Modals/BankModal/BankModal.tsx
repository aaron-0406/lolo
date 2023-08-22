import { useState } from 'react'
import Container from '../../../../../ui/Container'
import Modal from '../../../../../ui/Modal'
import BankActions from './BankActions'
import BankNoSelected from './BankNoSelected'
import BankSelected from './BankSelected'
import elementSelect from './elementSelect'
import { BankType } from '../../../../../shared/types/dash/bank.type'

type CustomersModalProps = {
  visible: boolean
  onClose: () => void
}

const BankModal = ({ visible, onClose }: CustomersModalProps) => {
  const handleClickCloseModal = () => {
    onClose()
  }

  const defaultValuesElement = {
    bank: {
      id: 0,
      name: '',
      state: false,
      createdAt: new Date(),
      CUSTOMER_HAS_BANK: {
        id: 0,
        idCustomer: 0,
        idBank: 0,
      },
    },
    key: '',
  }

  const [elementSelect, setElementSelected] = useState<elementSelect>(defaultValuesElement)

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
          setGlobalElement={(element: elementSelect) => {
            setElementSelected(element)
          }}
        />
        <BankActions elementSelected={elementSelect} />
        <BankNoSelected
          setGlobalElement={(element: elementSelect) => {
            setElementSelected(element)
          }}
        />
      </Container>
    </Modal>
  )
}

export default BankModal
