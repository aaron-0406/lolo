import { useFormContext } from 'react-hook-form'
import styled, { css } from 'styled-components'
import Button from '../../../../../../../ui/Button'
import Container from '../../../../../../../ui/Container'
import { CustomerFirmType } from '../../../../../../../shared/types/customer-firm.type'

const AddCcustomersActions = () => {

  const { setValue, reset, handleSubmit, getValues } = useFormContext<CustomerFirmType>()

  return (
    <StyledContainer width="100%" height="75px" display="flex" justifyContent="center" alignItems="center" gap="20px">
      <Button
        width="125px"
        label="Agregar"
        shape="default"
        trailingIcon="ri-add-fill"
        // onClick={onAddCustomer}
        // loading={loadingCreateCustomer}
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
