import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useState, useEffect } from 'react'
import { useMediaQuery } from '../../../../../../shared/hooks/useMediaQuery'
import { device } from '../../../../../../shared/breakpoints/reponsive'
import { useDashContext } from '../../../../../../shared/contexts/DashProvider'
import { BankType } from '../../../../../../shared/types/dash/bank.type'
import elementSelect from '../elementSelect'
import { CustomerHasBankType } from '../../../../../../shared/types/dash/customer-has-bank'
import { revokeCHB, assingCHB } from '../../../../../../shared/services/dash/customer-has-bank.service'
import Container from '../../../../../../ui/Container'
import Button from '../../../../../../ui/Button'
import { AxiosResponse } from 'axios'
import notification from '../../../../../../ui/notification'
import dashBanksCache from '../dash-banks.cache'

type BankActionsType = {
  elementSelected: elementSelect
}

const BankActions = ({ elementSelected }: BankActionsType) => {
  const {
    dashCustomer: { selectedCustomer },
  } = useDashContext()

  const queryClient = useQueryClient()

  const {
    actions: { AddBankCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = dashBanksCache(queryClient)

  const onHandlClickRemove = () => {
    elementSelected.key === 'BS' ? remove() : notification({ type: 'warning', message: 'El banco no está asignado' })
  }

  const onHandlClickAssing = () => {
    elementSelected.key === 'BNS' ? assing() : notification({ type: 'warning', message: 'El banco ya está asignado' })
  }

  const { isLoading: loadingRemove, mutate: remove } = useMutation<AxiosResponse<CustomerHasBankType>, Error>(
    async () => {
      const { id } = elementSelected.bank.CUSTOMER_HAS_BANK
      return await revokeCHB(id)
    },
    {
      onMutate: () => {
        
      },
      onSuccess: () => {
        notification({ type: 'success', message: 'El banco se removió del cliente' })
      },
      onError: (error: any) => {
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
      onSuccess: (result) => {
        notification({ type: 'success', message: 'El banco fue asignado al cliente' })
      },
      onError: (error: any) => {
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
