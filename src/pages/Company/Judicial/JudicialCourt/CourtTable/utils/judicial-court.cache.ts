import { QueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import { JudicialCourtType } from '@/types/judicial/judicial-court.type'

export const KEY_JUDICIAL_COURTS_CACHE = 'key-judicial-courts-cache'

type QueryDataType = AxiosResponse<JudicialCourtType[]> | undefined

const judicialCourtCache = (queryClient: QueryClient) => {
  const createCourtCache = (data: JudicialCourtType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_COURTS_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const editCourtCache = (data: JudicialCourtType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_COURTS_CACHE, data.customerHasBankId], (old) => {
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

  const deleteCourtCache = (idJudicialCourt: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_COURTS_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter(
          (judicialCourt: JudicialCourtType) => judicialCourt.id !== parseInt(idJudicialCourt)
        )
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_JUDICIAL_COURTS_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_JUDICIAL_COURTS_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_JUDICIAL_COURTS_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_JUDICIAL_COURTS_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_JUDICIAL_COURTS_CACHE, chb], context.old)
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

export default judicialCourtCache
