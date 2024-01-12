import { QueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import { DirectionType } from '@/types/extrajudicial/direction.type'

export const KEY_COBRANZA_URL_ADDRESSES_CODE_CACHE = 'key-cobranza-url-addresses-code-cache'

type QueryDataType = AxiosResponse<DirectionType[]> | undefined

const companyAddressesCache = (queryClient: QueryClient) => {
  const createCobranzaAddressCache = (data: DirectionType) => {
    queryClient.setQueryData<QueryDataType>([KEY_COBRANZA_URL_ADDRESSES_CODE_CACHE, data.clientId], (old) => {
      if (old) {
        return { ...old, data: [data, ...old.data] }
      }
    })
  }

  const editCobranzaAddressCache = (data: DirectionType) => {
    queryClient.setQueryData<QueryDataType>([KEY_COBRANZA_URL_ADDRESSES_CODE_CACHE, data.clientId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((address: DirectionType) => {
          if (address.id === data.id) {
            return data
          }

          return address
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteCobranzaAddressCache = (addressId: number, clientId: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_COBRANZA_URL_ADDRESSES_CODE_CACHE, clientId], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((address: DirectionType) => address.id !== addressId)
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (clientId: number) => {
    await queryClient.refetchQueries([KEY_COBRANZA_URL_ADDRESSES_CODE_CACHE, clientId])
  }

  const onMutateCache = async (clientId: number) => {
    const old = queryClient.getQueryData([KEY_COBRANZA_URL_ADDRESSES_CODE_CACHE, clientId])
    if (!old) {
      await queryClient.prefetchQuery([KEY_COBRANZA_URL_ADDRESSES_CODE_CACHE, clientId])
    }

    return { old }
  }

  const onSettledCache = (clientId: number) => {
    queryClient.cancelQueries([KEY_COBRANZA_URL_ADDRESSES_CODE_CACHE, clientId])
  }

  const onErrorCache = (context: { old: QueryDataType }, clientId: number) => {
    queryClient.setQueryData([KEY_COBRANZA_URL_ADDRESSES_CODE_CACHE, clientId], context.old)
  }

  return {
    actions: {
      createCobranzaAddressCache,
      editCobranzaAddressCache,
      deleteCobranzaAddressCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default companyAddressesCache
