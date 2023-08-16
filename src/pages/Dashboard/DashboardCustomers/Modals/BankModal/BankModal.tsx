import Container from '../../../../../ui/Container'
import Modal from '../../../../../ui/Modal'
import { useState, useEffect } from 'react'
import TextField from '../../../../../ui/fields/TextField'
import { useQuery } from 'react-query'
import { useMediaQuery } from '../../../../../shared/hooks/useMediaQuery'
import { device } from '../../../../../shared/breakpoints/reponsive'
import { useDashContext } from '../../../../../shared/contexts/DashProvider'
import BankActions from './BankActions'
import BankNoSelected from './BankNoSelected'
import BankSelected from './BankSelected'

import Button from '../../../../../ui/Button'

type CustomersModalProps = {
  visible: boolean
  onClose: () => void
}

const BankModal = ({ visible, onClose }: CustomersModalProps) => {
  const {
    dashCustomer: { selectedCustomer },
  } = useDashContext()

  const greaterThanMobile = useMediaQuery(device.tabletS)

  const [load, setLoad] = useState(false)
  const [banks, setBanks] = useState([])

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
