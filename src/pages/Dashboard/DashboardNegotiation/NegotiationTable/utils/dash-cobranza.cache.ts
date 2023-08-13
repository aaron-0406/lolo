import { QueryClient } from 'react-query'
import { NegotiationType } from '../../../../../shared/types/negotiation.type'
import { AxiosResponse } from 'axios'

export const KEY_DASH_NEGOTIATION_CACHE = 'key-dash-negotiation-cache'

type QueryDataType = AxiosResponse<NegotiationType[]> | undefined

const dashNegotiationCache = (queryClient: QueryClient) => {
  const createNegotiationCache = (data: NegotiationType) => {
    queryClient.setQueryData<QueryDataType>(KEY_DASH_NEGOTIATION_CACHE, (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const editNegotiationCache = (data: NegotiationType) => {
    queryClient.setQueryData<QueryDataType>(KEY_DASH_NEGOTIATION_CACHE, (old) => {
      if (old) {
        const dataUpdated = old.data.map((negotiation: NegotiationType) => {
          if (negotiation.id === data.id) {
            return data
          }

          return negotiation
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteNegotiationCache = (idUser: string) => {
    queryClient.setQueryData<QueryDataType>(KEY_DASH_NEGOTIATION_CACHE, (old) => {
      if (old) {
        const dataUpdated = old.data.filter((user: NegotiationType) => user.id !== parseInt(idUser))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async () => {
    await queryClient.refetchQueries(KEY_DASH_NEGOTIATION_CACHE)
  }

  const onMutateCache = async () => {
    const old = queryClient.getQueryData(KEY_DASH_NEGOTIATION_CACHE)
    if (!old) {
      await queryClient.prefetchQuery(KEY_DASH_NEGOTIATION_CACHE)
    }

    return { old }
  }

  const onSettledCache = () => {
    queryClient.cancelQueries(KEY_DASH_NEGOTIATION_CACHE)
  }

  const onErrorCache = (context: { old: QueryDataType }) => {
    queryClient.setQueryData(KEY_DASH_NEGOTIATION_CACHE, context.old)
  }

  return {
    actions: {
      deleteNegotiationCache,
      createNegotiationCache,
      editNegotiationCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default dashNegotiationCache
