import { useMutation, useQueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import styled, { css } from 'styled-components'
import { useDashContext } from '../../../../../../shared/contexts/DashProvider'
import { SelectedElementType } from '../bankModal.type'
import { CustomerHasBankType } from '../../../../../../shared/types/dash/customer-has-bank'
import { revokeCHB, assingCHB } from '../../../../../../shared/services/dash/customer-has-bank.service'
import Container from '../../../../../../ui/Container'
import Button from '../../../../../../ui/Button'
import notification from '../../../../../../ui/notification'
import dashBanksCache from '../BankNoSelected/utils/dash-banks.cache'
import dashCustomerBankCache from '../BankSelected/utils/dash-customer-banks.cache'

type BankActionsProps = {
  elementSelected: SelectedElementType
}

const BankActions = ({ elementSelected }: BankActionsProps) => {
  const {
    dashCustomer: { selectedCustomer },
  } = useDashContext()

  const queryClient = useQueryClient()

  const {
    actions: { addBankCache, deleteBankCache },
  } = dashBanksCache(queryClient)

  const {
    actions: { addCHBCache, deleteCHBCache },
    onMutateCHBCache,
    onSettledCHBCache,
    onErrorCHBCache,
    onRefetchQueryCHBCache,
  } = dashCustomerBankCache(queryClient)

  const onHandlClickRemove = () => {
    elementSelected.key === 'SELECTED_BANK'
      ? remove()
      : notification({ type: 'warning', message: 'El banco no está asignado' })
  }

  const onHandlClickAssing = () => {
    elementSelected.key === 'BANK_NOT_SELECTED'
      ? assing()
      : notification({ type: 'warning', message: 'El banco ya está asignado' })
  }

  const { isLoading: loadingRemove, mutate: remove } = useMutation<AxiosResponse<CustomerHasBankType>, Error>(
    async () => {
      const { id } = elementSelected.bank.CUSTOMER_HAS_BANK
      return await revokeCHB(id)
    },
    {
      onSuccess: (data) => {
        addBankCache(elementSelected.bank)
        deleteCHBCache(String(data.data.id), selectedCustomer.id)
        notification({ type: 'success', message: 'El banco se removió del cliente' })
      },
      onMutate: () => {
        return onMutateCHBCache(selectedCustomer.id)
      },
      onSettled: () => {
        onSettledCHBCache(selectedCustomer.id)
      },
      onError: (error: any, _, context: any) => {
        onErrorCHBCache(context, selectedCustomer.id)
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { isLoading: loadingAssing, mutate: assing } = useMutation<AxiosResponse<CustomerHasBankType>, Error>(
    async () => {
      const { id: idCustomer } = selectedCustomer
      const { id: idBank } = elementSelected.bank
      return await assingCHB({ idCustomer, idBank })
    },
    {
      onSuccess: ({ data }) => {
        deleteBankCache(String(data.idBank))
        addCHBCache(data)
        onRefetchQueryCHBCache(selectedCustomer.id)
        notification({ type: 'success', message: 'El banco fue asignado al cliente' })
      },
      onMutate: () => {
        return onMutateCHBCache(selectedCustomer.id)
      },
      onSettled: () => {
        onSettledCHBCache(selectedCustomer.id)
      },
      onError: (error: any, _, context: any) => {
        onErrorCHBCache(context, selectedCustomer.id)
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  return (
    <StyledContainer height="60px" width="100%" justifyContent="center" display="flex" alignItems="center">
      <StyledButtons width="100px" height="40px" display="flex" justifyContent="space-between" alignItems="center">
        <Button
          loading={loadingRemove}
          size="small"
          shape="round"
          trailingIcon="ri-arrow-right-line"
          onClick={onHandlClickRemove}
        />
        <Button
          loading={loadingAssing}
          size="small"
          shape="round"
          trailingIcon="ri-arrow-left-line"
          onClick={onHandlClickAssing}
        />
      </StyledButtons>
    </StyledContainer>
  )
}

export default BankActions

const StyledButtons = styled(Container)`
  ${({ theme }) => css`
    @media ${theme.device.tabletS} {
      width: 100%;
      height: 100px;
      flex-direction: column;
    }
  `}
`

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    @media ${theme.device.tabletS} {
      width: 10%;
      height: 100%;
    }
  `}
`
