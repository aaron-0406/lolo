import { useState } from 'react'
import Container from '../../../../../ui/Container'
import Modal from '../../../../../ui/Modal'
import BankActions from './BankActions'
import BankNoSelected from './BankNoSelected'
import BankSelected from './BankSelected'
import { SelectedElementType } from './bankModal.type'
import { useMediaQuery } from '../../../../../shared/hooks/useMediaQuery'
import { device } from '../../../../../shared/breakpoints/reponsive'

type BankModalProps = {
  visible: boolean
  onClose: () => void
}

const defaultValuesElement: SelectedElementType = {
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
  key: 'BANK_NOT_SELECTED',
}

const BankModal = ({ visible, onClose }: BankModalProps) => {
  const greaterThanMobile = useMediaQuery(device.tabletS)
  const [elementSelect, setElementSelected] = useState<SelectedElementType>(defaultValuesElement)

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
      <Container width="100%" height="100%" padding="20px" display={greaterThanMobile ? 'flex' : 'block'}>
        <BankSelected
          setGlobalElement={(element: SelectedElementType) => {
            setElementSelected(element)
          }}
        />
        <BankActions elementSelected={elementSelect} />
        <BankNoSelected
          setGlobalElement={(element: SelectedElementType) => {
            setElementSelected(element)
          }}
        />
      </Container>
    </Modal>
  )
}

export default BankModal