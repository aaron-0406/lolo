import { ProductType } from '@/types/extrajudicial/product.type'
import { AxiosResponse } from 'axios'
import { QueryClient } from 'react-query'

export const KEY_JUDICIAL_URL_DEMANDED_PRODUCT_CODE_CACHE = 'key-judicial-url-demanded-product-code-cache'

type QueryDataType = AxiosResponse<ProductType[]> | undefined

const judicialDemandedProductsCache = (queryClient: QueryClient) => {
  const assignProductsToTheCaseFileCache = (data: ProductType[], caseFileId: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_URL_DEMANDED_PRODUCT_CODE_CACHE, caseFileId], (old) => {
      if (old) {
        return { ...old, data: [...data] }
      }
    })
  }

  const removeProductOfTheCaseFileCache = (productId: number, caseFileId: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_URL_DEMANDED_PRODUCT_CODE_CACHE, caseFileId], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((product: ProductType) => product.id !== productId)
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (caseFileId: number) => {
    await queryClient.refetchQueries([KEY_JUDICIAL_URL_DEMANDED_PRODUCT_CODE_CACHE, caseFileId])
  }

  const onMutateCache = async (caseFileId: number) => {
    const old = queryClient.getQueryData([KEY_JUDICIAL_URL_DEMANDED_PRODUCT_CODE_CACHE, caseFileId])
    if (!old) {
      await queryClient.prefetchQuery([KEY_JUDICIAL_URL_DEMANDED_PRODUCT_CODE_CACHE, caseFileId])
    }

    return { old }
  }

  const onSettledCache = (caseFileId: number) => {
    queryClient.cancelQueries([KEY_JUDICIAL_URL_DEMANDED_PRODUCT_CODE_CACHE, caseFileId])
  }

  const onErrorCache = (context: { old: QueryDataType }, caseFileId: number) => {
    queryClient.setQueryData([KEY_JUDICIAL_URL_DEMANDED_PRODUCT_CODE_CACHE, caseFileId], context.old)
  }

  return {
    actions: {
      assignProductsToTheCaseFileCache,
      removeProductOfTheCaseFileCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default judicialDemandedProductsCache
