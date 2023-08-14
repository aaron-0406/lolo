import { QueryClient } from 'react-query'
import { NegotiationType } from '../../../../../shared/types/negotiation.type'
import { AxiosResponse } from 'axios'

export const KEY_DASH_NEGOCIACIONES_CACHE = 'key-dash-negociaciones-cache'

type QueryDataType = AxiosResponse<NegotiationType[]> | undefined

const dashNegotiationCache = (queryClient: QueryClient) => {
  const createNegotiationCache = (data: NegotiationType) => {
    queryClient.setQueryData<QueryDataType>([KEY_DASH_NEGOCIACIONES_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const editNegotiationCache = (data: NegotiationType) => {
    queryClient.setQueryData<QueryDataType>([KEY_DASH_NEGOCIACIONES_CACHE, data.customerHasBankId], (old) => {
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

  const deleteNegotiationCache = (idUser: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_DASH_NEGOCIACIONES_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((user: NegotiationType) => user.id !== parseInt(idUser))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_DASH_NEGOCIACIONES_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_DASH_NEGOCIACIONES_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_DASH_NEGOCIACIONES_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_DASH_NEGOCIACIONES_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_DASH_NEGOCIACIONES_CACHE, chb], context.old)
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
