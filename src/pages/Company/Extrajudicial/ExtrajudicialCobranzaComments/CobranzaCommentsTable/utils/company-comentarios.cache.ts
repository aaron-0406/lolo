import { QueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import { CommentType } from '../../../../../../shared/types/extrajudicial/comment.type'

export const KEY_COBRANZA_URL_COBRANZA_CODE_CACHE = 'key-cobranza-url-cobranza-code-cache'

type QueryDataType = AxiosResponse<CommentType[]> | undefined

const companyComentariosCache = (queryClient: QueryClient) => {
  const createCobranzaCommentCache = (data: CommentType) => {
    queryClient.setQueryData<QueryDataType>([KEY_COBRANZA_URL_COBRANZA_CODE_CACHE], (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const editCobranzaCommentCache = (data: CommentType) => {
    queryClient.setQueryData<QueryDataType>([KEY_COBRANZA_URL_COBRANZA_CODE_CACHE], (old) => {
      if (old) {
        const dataUpdated = old.data.map((action: CommentType) => {
          if (action.id === data.id) {
            return data
          }

          return action
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteCobranzaCommentCache = (idComment: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_COBRANZA_URL_COBRANZA_CODE_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((user: CommentType) => user.id !== parseInt(idComment))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_COBRANZA_URL_COBRANZA_CODE_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_COBRANZA_URL_COBRANZA_CODE_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_COBRANZA_URL_COBRANZA_CODE_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_COBRANZA_URL_COBRANZA_CODE_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_COBRANZA_URL_COBRANZA_CODE_CACHE, chb], context.old)
  }

  return {
    actions: {
      createCobranzaCommentCache,
      editCobranzaCommentCache,
      deleteCobranzaCommentCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default companyComentariosCache
