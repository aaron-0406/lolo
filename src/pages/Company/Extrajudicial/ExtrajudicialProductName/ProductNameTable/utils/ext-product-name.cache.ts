import { AxiosResponse } from 'axios'
import { QueryClient } from 'react-query'
import { ExtProductNameType } from '@/types/extrajudicial/ext-product-name'

export const KEY_EXT_PRODUCT_NAME_CACHE = 'key-ext-product-name-cache'

type QueryDataType = AxiosResponse<ExtProductNameType[]> | undefined

const extContactTypeCache = (queryClient: QueryClient) => {
  const createProductNameCache = (data: ExtProductNameType) => {
    queryClient.setQueryData<QueryDataType>([KEY_EXT_PRODUCT_NAME_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const editProductNameCache = (data: ExtProductNameType) => {
    queryClient.setQueryData<QueryDataType>([KEY_EXT_PRODUCT_NAME_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((productName: ExtProductNameType) => {
          if (productName.id === data.id) {
            return data
          }

          return productName
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteProductNameCache = (idProductName: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_EXT_PRODUCT_NAME_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter(
          (productName: ExtProductNameType) => productName.id !== parseInt(idProductName)
        )
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_EXT_PRODUCT_NAME_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_EXT_PRODUCT_NAME_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_EXT_PRODUCT_NAME_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_EXT_PRODUCT_NAME_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_EXT_PRODUCT_NAME_CACHE, chb], context.old)
  }

  return {
    actions: {
      createProductNameCache,
      editProductNameCache,
      deleteProductNameCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default extContactTypeCache
