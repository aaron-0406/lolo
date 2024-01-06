import { ProductType } from '@/types/extrajudicial/product.type'
import { AxiosResponse } from 'axios'
import { QueryClient } from 'react-query'

export const KEY_COBRANZA_URL_PRODUCT_CODE_CACHE = 'key-cobranza-url-product-code-cache'

type QueryDataType = AxiosResponse<ProductType[]> | undefined

const companyProductsCache = (queryClient: QueryClient) => {
  const createCobranzaProductCache = (data: ProductType, clientId: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_COBRANZA_URL_PRODUCT_CODE_CACHE, clientId], (old) => {
      if (old) {
        return { ...old, data: [data, ...old.data] }
      }
    })
  }

  const editCobranzaProductCache = (data: ProductType, clientId: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_COBRANZA_URL_PRODUCT_CODE_CACHE, clientId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((product: ProductType) => {
          if (product.id === data.id) {
            return data
          }

          return product
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteCobranzaProductCache = (productId: number, clientId: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_COBRANZA_URL_PRODUCT_CODE_CACHE, clientId], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((product: ProductType) => product.id !== productId)
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (clientId: number) => {
    await queryClient.refetchQueries([KEY_COBRANZA_URL_PRODUCT_CODE_CACHE, clientId])
  }

  const onMutateCache = async (clientId: number) => {
    const old = queryClient.getQueryData([KEY_COBRANZA_URL_PRODUCT_CODE_CACHE, clientId])
    if (!old) {
      await queryClient.prefetchQuery([KEY_COBRANZA_URL_PRODUCT_CODE_CACHE, clientId])
    }

    return { old }
  }

  const onSettledCache = (clientId: number) => {
    queryClient.cancelQueries([KEY_COBRANZA_URL_PRODUCT_CODE_CACHE, clientId])
  }

  const onErrorCache = (context: { old: QueryDataType }, clientId: number) => {
    queryClient.setQueryData([KEY_COBRANZA_URL_PRODUCT_CODE_CACHE, clientId], context.old)
  }

  return {
    actions: {
      createCobranzaProductCache,
      editCobranzaProductCache,
      deleteCobranzaProductCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default companyProductsCache
