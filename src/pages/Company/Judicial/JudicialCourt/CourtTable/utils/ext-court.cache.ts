import { QueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import { JudicialCourtType } from '@/types/judicial/judicial-court.type'

export const KEY_EXT_JUDICIAL_COURTS_CACHE = 'key-ext-judicial-courts-cache'

type QueryDataType = AxiosResponse<JudicialCourtType[]> | undefined

const extCourtCache = (queryClient: QueryClient) => {
  const createCourtCache = (data: JudicialCourtType) => {
    queryClient.setQueryData<QueryDataType>([KEY_EXT_JUDICIAL_COURTS_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const editCourtCache = (data: JudicialCourtType) => {
    queryClient.setQueryData<QueryDataType>([KEY_EXT_JUDICIAL_COURTS_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((court: JudicialCourtType) => {
          if (court.id === data.id) {
            return data
          }

          return court
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteCourtCache = (idUser: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_EXT_JUDICIAL_COURTS_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((user: JudicialCourtType) => user.id !== parseInt(idUser))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_EXT_JUDICIAL_COURTS_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_EXT_JUDICIAL_COURTS_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_EXT_JUDICIAL_COURTS_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_EXT_JUDICIAL_COURTS_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_EXT_JUDICIAL_COURTS_CACHE, chb], context.old)
  }

  return {
    actions: {
      deleteCourtCache,
      createCourtCache,
      editCourtCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default extCourtCache
