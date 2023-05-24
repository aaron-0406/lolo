import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'
import styled, { css } from 'styled-components'
import Button from '../../../../../../ui/Button'
import Container from '../../../../../../ui/Container'
import notification from '../../../../../../ui/notification'
import { CustomerType } from '../../../../../../shared/types/customer.type'
import { createClient, getCustomerAll } from '../../../../../../shared/services/customer.service'
import { useLoloContext } from '../../../../../../shared/contexts/LoloProvider'

const AddCcustomersActions = () => {
  
  const { setValue, reset, handleSubmit, getValues } = useFormContext<CustomerType>()

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
    handleSubmit(() => {
      createCustomer()
    })()
    let a = getCustomerAll();
    console.log(a)
  }

  return (
    <StyledContainer width="100%" height="75px" display="flex" justifyContent="center" alignItems="center" gap="20px">
      <Button
        width="125px"
        label="Agregar"
        shape="default"
        trailingIcon="ri-add-fill"
        onClick={onAddCustomer}
        loading={loadingCreateCustomer}
      />
    </StyledContainer>
  )
}
export default AddCcustomersActions

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    @media ${theme.device.tabletL} {
      gap: 10px;
    }

    @media ${theme.device.desktopL} {
      gap: 30px;
    }
  `}
`
