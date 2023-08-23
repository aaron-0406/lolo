import { QueryClient } from 'react-query'
import { CustomerHasBankType } from '../../../../../../../shared/types/dash/customer-has-bank'
import { AxiosResponse } from 'axios'

export const KEY_DASH_CUSTOMER_BANK_CACHE = 'key-dash-customer-bank-cache'

export type QueryDataType = AxiosResponse<CustomerHasBankType[]> | undefined

const dashCustomerBankCache = (queryClient: QueryClient) => {
  
  const AddCHBCache = (data: CustomerHasBankType) => {
    queryClient.setQueryData<QueryDataType>(KEY_DASH_CUSTOMER_BANK_CACHE, (oldQueryData) => {
      if (oldQueryData) {
        console.log("2")
        return {
          ...oldQueryData,
          data: [...oldQueryData?.data, data],
        }
      }
    })
  }

  const deleteCHBCache = (idBank: string) => {
    queryClient.setQueryData<QueryDataType>([KEY_DASH_CUSTOMER_BANK_CACHE], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((bank: CustomerHasBankType) => bank.id !== parseInt(idBank))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const data = queryClient.getQueryData<QueryDataType>([KEY_DASH_CUSTOMER_BANK_CACHE])

  const onRefetchQueryCHBCache = async () => {
    await queryClient.refetchQueries([KEY_DASH_CUSTOMER_BANK_CACHE])
  }

  const onMutateCHBCache = async () => {
    const old = queryClient.getQueryData([KEY_DASH_CUSTOMER_BANK_CACHE])
    if (!old) {
      await queryClient.prefetchQuery([KEY_DASH_CUSTOMER_BANK_CACHE])
    }

    return { old }
  }

  const onSettledCHBCache = () => {
    queryClient.cancelQueries([KEY_DASH_CUSTOMER_BANK_CACHE])
  }

  const onErrorCHBCache = (context: { old: QueryDataType }) => {
    queryClient.setQueryData([KEY_DASH_CUSTOMER_BANK_CACHE], context.old)
  }

  return {
    actions: {
      AddCHBCache,
      deleteCHBCache,
    },
    data,
    onRefetchQueryCHBCache,
    onMutateCHBCache,
    onSettledCHBCache,
    onErrorCHBCache,
  }
}

export default dashCustomerBankCache
