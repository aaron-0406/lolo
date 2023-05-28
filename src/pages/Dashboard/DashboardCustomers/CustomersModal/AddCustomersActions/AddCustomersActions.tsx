import { useFormContext } from 'react-hook-form'
import { useMutation } from 'react-query'
import styled, { css } from 'styled-components'
import Button from '../../../../../ui/Button'
import Container from '../../../../../ui/Container'
import notification from '../../../../../ui/notification'
import { CustomerType } from '../../../../../shared/types/customer.type'
import { createClient } from '../../../../../shared/services/customer.service'

const AddCcustomersActions = () => {
  const {
    setValue,
    getValues,
    formState: { isValid },
  } = useFormContext<CustomerType>()

  const {
    isLoading: loadingCreateCustomer,
    mutate: createCustomer,
  } = useMutation<any, Error>(
    async () => {
      const { id, ...restClient } = getValues()
      console.log(restClient)
      return await createClient(restClient)
    },
    {
      onSuccess: (data) => {
        console.log("A")
        notification({ type: 'success', message: 'Cliente creado' })
        setValue('id', data.data.id)
      },
      onError: (error: any) => {
        console.log("B")
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const onAddCustomer = () => {
    setValue('createdAt', new Date())
    createCustomer()
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
        disabled={!isValid}
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
