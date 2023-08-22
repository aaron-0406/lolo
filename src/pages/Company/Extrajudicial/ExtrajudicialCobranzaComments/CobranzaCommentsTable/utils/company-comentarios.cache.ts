import { QueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import { CommentType } from '../../../../../../shared/types/extrajudicial/comment.type'

export const KEY_COBRANZA_URL_COBRANZA_CODE_CACHE = 'key-cobranza-url-cobranza-code-cache'

type QueryDataType = AxiosResponse<CommentType[]> | undefined

const companyComentariosCache = (queryClient: QueryClient) => {
  const createCobranzaCommentCache = (data: CommentType) => {
    queryClient.setQueryData<QueryDataType>([KEY_COBRANZA_URL_COBRANZA_CODE_CACHE, data.clientId], (old) => {
      if (old) {
        return { ...old, data: [data, ...old.data] }
      }
    })
  }

  const editCobranzaCommentCache = (data: CommentType) => {
    queryClient.setQueryData<QueryDataType>([KEY_COBRANZA_URL_COBRANZA_CODE_CACHE, data.clientId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((comment: CommentType) => {
          if (comment.id === data.id) {
            return data
          }

          return comment
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteCobranzaCommentCache = (commentId: number, clientId: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_COBRANZA_URL_COBRANZA_CODE_CACHE, clientId], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((comment: CommentType) => comment.id !== commentId)
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (clientId: number) => {
    await queryClient.refetchQueries([KEY_COBRANZA_URL_COBRANZA_CODE_CACHE, clientId])
  }

  const onMutateCache = async (clientId: number) => {
    const old = queryClient.getQueryData([KEY_COBRANZA_URL_COBRANZA_CODE_CACHE, clientId])
    if (!old) {
      await queryClient.prefetchQuery([KEY_COBRANZA_URL_COBRANZA_CODE_CACHE, clientId])
    }

    return { old }
  }

  const onSettledCache = (clientId: number) => {
    queryClient.cancelQueries([KEY_COBRANZA_URL_COBRANZA_CODE_CACHE, clientId])
  }

  const onErrorCache = (context: { old: QueryDataType }, clientId: number) => {
    queryClient.setQueryData([KEY_COBRANZA_URL_COBRANZA_CODE_CACHE, clientId], context.old)
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
