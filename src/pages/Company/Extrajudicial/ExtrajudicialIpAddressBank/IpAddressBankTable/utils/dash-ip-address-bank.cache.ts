import { AxiosResponse } from 'axios'
import { QueryClient } from 'react-query'
import { ExtIpAddressBankType } from '@/types/extrajudicial/ext-ip-address-bank.type'

export const KEY_EXT_IP_ADDRESS_BANK_CACHE = 'key-ext-ip-address-bank-cache'

type QueryDataType = AxiosResponse<ExtIpAddressBankType[]> | undefined

const dashIpAddressBankCache = (queryClient: QueryClient) => {
  const createIpAddressBankCache = (data: ExtIpAddressBankType) => {
    queryClient.setQueryData<QueryDataType>(KEY_EXT_IP_ADDRESS_BANK_CACHE, (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const editIpAddressBankCache = (data: ExtIpAddressBankType) => {
    queryClient.setQueryData<QueryDataType>(KEY_EXT_IP_ADDRESS_BANK_CACHE, (old) => {
      if (old) {
        const dataUpdated = old.data.map((ipAddress: ExtIpAddressBankType) => {
          if (ipAddress.id === data.id) {
            return data
          }

          return ipAddress
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteIpAddressBankCache = (id: string) => {
    queryClient.setQueryData<QueryDataType>(KEY_EXT_IP_ADDRESS_BANK_CACHE, (old) => {
      if (old) {
        const dataUpdated = old.data.filter((ipAddress: ExtIpAddressBankType) => ipAddress.id !== parseInt(id))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async () => {
    await queryClient.refetchQueries(KEY_EXT_IP_ADDRESS_BANK_CACHE)
  }

  const onMutateCache = async () => {
    const old = queryClient.getQueryData(KEY_EXT_IP_ADDRESS_BANK_CACHE)
    if (!old) {
      await queryClient.prefetchQuery(KEY_EXT_IP_ADDRESS_BANK_CACHE)
    }

    return { old }
  }

  const onSettledCache = () => {
    queryClient.cancelQueries(KEY_EXT_IP_ADDRESS_BANK_CACHE)
  }

  const onErrorCache = (context: { old: QueryDataType }) => {
    queryClient.setQueryData(KEY_EXT_IP_ADDRESS_BANK_CACHE, context.old)
  }

  return {
    actions: {
      createIpAddressBankCache,
      editIpAddressBankCache,
      deleteIpAddressBankCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default dashIpAddressBankCache
