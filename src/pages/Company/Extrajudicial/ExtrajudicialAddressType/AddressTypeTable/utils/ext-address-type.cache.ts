import { AxiosResponse } from 'axios'
import { QueryClient } from 'react-query'
import { ExtAddressType } from '@/types/extrajudicial/ext-address-type.type'

export const KEY_EXT_ADDRESS_TYPE_CACHE = 'key-ext-address-type-cache'

type QueryDataType = AxiosResponse<ExtAddressType[]> | undefined

const extAddressTypeCache = (queryClient: QueryClient) => {
  const createAddressTypeCache = (data: ExtAddressType) => {
    queryClient.setQueryData<QueryDataType>([KEY_EXT_ADDRESS_TYPE_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const editAddressTypeCache = (data: ExtAddressType) => {
    queryClient.setQueryData<QueryDataType>([KEY_EXT_ADDRESS_TYPE_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((addressType: ExtAddressType) => {
          if (addressType.id === data.id) {
            return data
          }

          return addressType
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteAddressTypeCache = (idAddressType: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_EXT_ADDRESS_TYPE_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((addressType: ExtAddressType) => addressType.id !== parseInt(idAddressType))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_EXT_ADDRESS_TYPE_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_EXT_ADDRESS_TYPE_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_EXT_ADDRESS_TYPE_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_EXT_ADDRESS_TYPE_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_EXT_ADDRESS_TYPE_CACHE, chb], context.old)
  }

  return {
    actions: {
      createAddressTypeCache,
      editAddressTypeCache,
      deleteAddressTypeCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default extAddressTypeCache
