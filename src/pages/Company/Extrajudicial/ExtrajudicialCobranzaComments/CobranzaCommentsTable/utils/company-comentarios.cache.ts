import { QueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import { CommentType } from '../../../../../../shared/types/extrajudicial/comment.type'

export const KEY_COMPANY_COMENTARIOS_CACHE = 'key-company-comentarios-cache'

type QueryDataType = AxiosResponse<CommentType[]> | undefined

const companyComentariosCache = (queryClient: QueryClient) => {
  const createCobranzaCommentCache = (data: CommentType) => {
    queryClient.setQueryData<QueryDataType>([KEY_COMPANY_COMENTARIOS_CACHE], (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const editCobranzaCommentCache = (data: CommentType) => {
    queryClient.setQueryData<QueryDataType>([KEY_COMPANY_COMENTARIOS_CACHE], (old) => {
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
    queryClient.setQueryData<QueryDataType>([KEY_COMPANY_COMENTARIOS_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((user: CommentType) => user.id !== parseInt(idComment))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_COMPANY_COMENTARIOS_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_COMPANY_COMENTARIOS_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_COMPANY_COMENTARIOS_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_COMPANY_COMENTARIOS_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_COMPANY_COMENTARIOS_CACHE, chb], context.old)
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
