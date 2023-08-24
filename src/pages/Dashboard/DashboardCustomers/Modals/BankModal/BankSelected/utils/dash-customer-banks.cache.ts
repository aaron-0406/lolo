import { QueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import { CustomerHasBankType } from '../../../../../../../shared/types/dash/customer-has-bank'

export const KEY_DASH_CUSTOMER_BANK_CACHE = 'key-dash-customer-bank-cache'

export type QueryDataType = AxiosResponse<CustomerHasBankType[]> | undefined

const dashCustomerBankCache = (queryClient: QueryClient) => {
  const addCHBCache = (data: CustomerHasBankType) => {
    queryClient.setQueryData<QueryDataType>([KEY_DASH_CUSTOMER_BANK_CACHE, data.idCustomer], (oldQueryData) => {
      if (oldQueryData) {
        return {
          ...oldQueryData,
          data: [...oldQueryData?.data, data],
        }
      }
    })
  }

  const deleteCHBCache = (idBank: string, customerId: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_DASH_CUSTOMER_BANK_CACHE, customerId], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((bank: CustomerHasBankType) => bank.id !== parseInt(idBank))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCHBCache = async (customerId: number) => {
    await queryClient.refetchQueries([KEY_DASH_CUSTOMER_BANK_CACHE, customerId])
  }

  const onMutateCHBCache = async (customerId: number) => {
    const old = queryClient.getQueryData([KEY_DASH_CUSTOMER_BANK_CACHE, customerId])
    if (!old) {
      await queryClient.prefetchQuery([KEY_DASH_CUSTOMER_BANK_CACHE, customerId])
    }

    return { old }
  }

  const onSettledCHBCache = (customerId: number) => {
    queryClient.cancelQueries([KEY_DASH_CUSTOMER_BANK_CACHE, customerId])
  }

  const onErrorCHBCache = (context: { old: QueryDataType }, customerId: number) => {
    queryClient.setQueryData([KEY_DASH_CUSTOMER_BANK_CACHE, customerId], context.old)
  }

  return {
    actions: {
      addCHBCache,
      deleteCHBCache,
    },
    onRefetchQueryCHBCache,
    onMutateCHBCache,
    onSettledCHBCache,
    onErrorCHBCache,
  }
}

export default dashCustomerBankCache
