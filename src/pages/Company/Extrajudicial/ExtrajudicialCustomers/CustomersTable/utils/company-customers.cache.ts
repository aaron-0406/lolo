import { ClientType } from '@/types/extrajudicial/client.type'
import { AxiosResponse } from 'axios'
import { QueryClient } from 'react-query'

export const KEY_COBRANZA_URL_CUSTOMER_CODE_CACHE = 'key-cobranza-url-customer-code-cache'

type QueryDataType = AxiosResponse<ClientType[]> | undefined

const companyCustomersCache = (queryClient: QueryClient) => {
  const createCobranzaCustomerCache = (data: ClientType) => {
    queryClient.setQueryData<QueryDataType>([KEY_COBRANZA_URL_CUSTOMER_CODE_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        return { ...old, data: [data, ...old.data] }
      }
    })
  }

  const editCobranzaCustomerCache = (data: ClientType) => {
    queryClient.setQueryData<QueryDataType>([KEY_COBRANZA_URL_CUSTOMER_CODE_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((client: ClientType) => {
          if (client.id === data.id) {
            return data
          }

          return client
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteCobranzaCustomerCache = (clientId: number, customerHasBankId: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_COBRANZA_URL_CUSTOMER_CODE_CACHE, customerHasBankId], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((customer: ClientType) => customer.id !== clientId)
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (customerHasBankId: number) => {
    await queryClient.refetchQueries([KEY_COBRANZA_URL_CUSTOMER_CODE_CACHE, customerHasBankId])
  }

  const onMutateCache = async (customerHasBankId: number) => {
    const old = queryClient.getQueryData([KEY_COBRANZA_URL_CUSTOMER_CODE_CACHE, customerHasBankId])
    if (!old) {
      await queryClient.prefetchQuery([KEY_COBRANZA_URL_CUSTOMER_CODE_CACHE, customerHasBankId])
    }

    return { old }
  }

  const onSettledCache = (customerHasBankId: number) => {
    queryClient.cancelQueries([KEY_COBRANZA_URL_CUSTOMER_CODE_CACHE, customerHasBankId])
  }

  const onErrorCache = (context: { old: QueryDataType }, customerHasBankId: number) => {
    queryClient.setQueryData([KEY_COBRANZA_URL_CUSTOMER_CODE_CACHE, customerHasBankId], context.old)
  }

  return {
    actions: {
      createCobranzaCustomerCache,
      editCobranzaCustomerCache,
      deleteCobranzaCustomerCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default companyCustomersCache
