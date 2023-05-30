import styled, { css } from 'styled-components'
import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'
import AddCustomerInfo from './AddCustomersInfo'
import { createClient, editCustomerById } from '../../../../shared/services/customer.service'
import { CustomerType } from '../../../../shared/types/customer.type'
import Container from '../../../../ui/Container'
import Modal from '../../../../ui/Modal'
import notification from '../../../../ui/notification'
import Button from '../../../../ui/Button'

type PModalAddCustomers = {
  visible: boolean
  onClose: () => void
  edit?: boolean
}

const ModalAddCustomers = ({ visible, onClose, edit }: PModalAddCustomers) => {
  const {
    setValue,
    getValues,
    formState: { isValid },
  } = useFormContext<CustomerType>()

  const { isLoading: loadingCreateCustomer, mutate: createCustomer } = useMutation<any, Error>(
    async () => {
      const { id, ...restClient } = getValues()
      return await createClient(restClient)
    },
    {
      onSuccess: (data) => {
        setValue('id', data.data.id)
        notification({ type: 'success', message: 'Cliente creado' })
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const onAddCustomer = () => {
    createCustomer()
  }

  const onEditCustomer = () => {
    console.log(getValues())
  }

  return (
    <Modal visible={visible} onClose={onClose} id="modal-files" title="Agregar Cliente" contentOverflowY="auto">
      <StyledContainer gap="20px">
        <AddCustomerInfo />
        <StyledContainerButton
          width="100%"
          height="75px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="20px"
        >
          <Button
            width="125px"
            label={edit? "Editar" : "Agregar"}
            shape="default"
            trailingIcon="ri-add-fill"
            onClick={edit? onEditCustomer : onAddCustomer}
            loading={loadingCreateCustomer}
            disabled={!isValid}
          />
        </StyledContainerButton>
      </StyledContainer>
    </Modal>
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
const StyledContainerButton = styled(Container)`
  ${({ theme }) => css`
    @media ${theme.device.tabletL} {
      gap: 10px;
    }
    @media ${theme.device.desktopL} {
      gap: 30px;
    }
  `}
`
