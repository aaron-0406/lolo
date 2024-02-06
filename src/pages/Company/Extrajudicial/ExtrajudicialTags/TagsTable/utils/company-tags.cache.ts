import { AxiosResponse } from 'axios'
import { QueryClient } from 'react-query'
import { ExtTagType } from '@/types/extrajudicial/ext-tag.type'

export const KEY_COBRANZA_URL_TAG_CODE_CACHE = 'key-cobranza-url-tag-code-cache'

type QueryDataType = AxiosResponse<Array<ExtTagType>> | undefined

const companyTagsCache = (queryClient: QueryClient) => {
  const createCobranzaTagCache = (data: ExtTagType) => {
    queryClient.setQueryData<QueryDataType>([KEY_COBRANZA_URL_TAG_CODE_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        return { ...old, data: [data, ...old.data] }
      }
    })
  }

  const editCobranzaTagCache = (data: ExtTagType) => {
    queryClient.setQueryData<QueryDataType>([KEY_COBRANZA_URL_TAG_CODE_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((tag: ExtTagType) => {
          if (tag.id === data.id) {
            return data
          }

          return tag
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteCobranzaTagCache = (tagId: number, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_COBRANZA_URL_TAG_CODE_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((tag: ExtTagType) => tag.id !== tagId)
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_COBRANZA_URL_TAG_CODE_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_COBRANZA_URL_TAG_CODE_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_COBRANZA_URL_TAG_CODE_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_COBRANZA_URL_TAG_CODE_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_COBRANZA_URL_TAG_CODE_CACHE, chb], context.old)
  }

  return {
    actions: {
      createCobranzaTagCache,
      editCobranzaTagCache,
      deleteCobranzaTagCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default companyTagsCache
