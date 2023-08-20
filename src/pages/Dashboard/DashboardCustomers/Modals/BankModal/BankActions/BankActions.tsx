import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useState, useEffect } from 'react'
import { useMediaQuery } from '../../../../../../shared/hooks/useMediaQuery'
import { device } from '../../../../../../shared/breakpoints/reponsive'
import { useDashContext } from '../../../../../../shared/contexts/DashProvider'
import { BankType } from '../../../../../../shared/types/bank.type'
import { CustomerHasBankType } from '../../../../../../shared/types/customer-has-bank'
import { deleteCustomerBank, assingCustomerBank } from '../../../../../../shared/services/customer-has-bank.service'
import Container from '../../../../../../ui/Container'
import Button from '../../../../../../ui/Button'
import { AxiosResponse } from 'axios'
import notification from '../../../../../../ui/notification'
import dashBanksCache from '../dash-banks.cache'

type BankActionsType = {
  bankSelected: BankType
}

const BankActions = ({ bankSelected }: BankActionsType) => {
  const {
    dashCustomer: { selectedCustomer, setSelectedCustomer },
  } = useDashContext()
  
  const queryClient = useQueryClient()

  const {
    actions: { createBankCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = dashBanksCache(queryClient)

  const onHandlClickRemove = () => {
    remove()
  }

  const onHandlClickAssing = () => {
    assing()
  }

  const { isLoading: loadingRemove, mutate: remove } = useMutation<AxiosResponse<CustomerHasBankType>, Error>(
    async () => {
      const { idBank, idCustomer } = bankSelected.CUSTOMER_HAS_BANK
      return await deleteCustomerBank(idCustomer, idBank)
    },
    {
      onSuccess: (result) => {
        // createCustomerCache(result.data)
        notification({ type: 'success', message: 'El banco se removió del cliente' })
      },
      // onMutate: () => {
      //   onMutateCache()
      // },
      // onSettled: () => {
      //   onSettledCache()
      // },
      onError: (error: any, _, context: any) => {
        // onErrorCache(context)
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
      const { id: idBank } = bankSelected
      return await assingCustomerBank({ idCustomer, idBank })
    },
    {
      onSuccess: (result) => {
        notification({ type: 'success', message: 'El banco fue asignado al cliente' })
      },
      // onMutate: () => {
      //   onMutateCache()
      // },
      // onSettled: () => {
      //   onSettledCache()
      // },
      onError: (error: any, _, context: any) => {
        // onErrorCache(context)
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  return (
    <Container width="10%" justifyContent="center" display="flex" alignItems="center">
      <Container
        height="100px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="column"
      >
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
      </Container>
    </Container>
  )
}

export default BankActions
