import { FormProvider, useForm } from 'react-hook-form'
import styled, { css } from 'styled-components'
import AddCustomersActions from './AddCustomersActions'
import AddCustomerInfo from './AddCustomersInfo'
import Container from '../../../../ui/Container'
import Modal from '../../../../ui/Modal'
import { CustomerType } from '../../../../shared/types/customer.type'
import { ModalCustomersResolver } from './ModalCustomers.yup'

type PModalAddCustomers = {
  visible: boolean
  onClose: () => void
}

const ModalAddCustomers = ({ visible, onClose }: PModalAddCustomers) => {
  const formMethods = useForm<Omit<CustomerType, 'customerBanks' | 'createdAt'>>({
    resolver: ModalCustomersResolver,
    mode: 'all',
    defaultValues: {
      id: 0,
      ruc: '',
      companyName: '',
      urlIdentifier: '',
      description: 'no description',
      state: undefined,
    },
  })

  return (
    <FormProvider {...formMethods}>
      <Modal visible={visible} onClose={onClose} id="modal-files" title="Agregar Cliente" contentOverflowY="auto">
        <StyledContainer gap="20px">
          <AddCustomerInfo />
          <AddCustomersActions />
        </StyledContainer>
      </Modal>
    </FormProvider>
  )
}

export default ModalAddCustomers

const StyledContainer = styled(Container)`
  ${css`
    width: 100%;
    height: 410px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  `}
`
