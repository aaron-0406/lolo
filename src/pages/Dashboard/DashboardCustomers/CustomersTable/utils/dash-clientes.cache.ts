import { QueryClient } from 'react-query'
import { CustomerType } from '@/types/dash/customer.type'
import { AxiosResponse } from 'axios'

export const KEY_DASH_CLIENTES_CACHE = 'key-dash-clientes-cache'

type QueryDataType = AxiosResponse<CustomerType[]> | undefined

const dashCustomersCache = (queryClient: QueryClient) => {
  const createCustomerCache = (data: CustomerType) => {
    queryClient.setQueryData<QueryDataType>(KEY_DASH_CLIENTES_CACHE, (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const editCustomerCache = (data: CustomerType) => {
    queryClient.setQueryData<QueryDataType>(KEY_DASH_CLIENTES_CACHE, (old) => {
      if (old) {
        const dataUpdated = old.data.map((customer: CustomerType) => {
          if (customer.id === data.id) {
            return data
          }

          return customer
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async () => {
    await queryClient.refetchQueries(KEY_DASH_CLIENTES_CACHE)
  }

  const onMutateCache = async () => {
    const old = queryClient.getQueryData(KEY_DASH_CLIENTES_CACHE)
    if (!old) {
      await queryClient.prefetchQuery(KEY_DASH_CLIENTES_CACHE)
    }

    return { old }
  }

  const onSettledCache = () => {
    queryClient.cancelQueries(KEY_DASH_CLIENTES_CACHE)
  }

  const onErrorCache = (context: { old: QueryDataType }) => {
    queryClient.setQueryData(KEY_DASH_CLIENTES_CACHE, context.old)
  }

  return {
    actions: {
      createCustomerCache,
      editCustomerCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default dashCustomersCache
