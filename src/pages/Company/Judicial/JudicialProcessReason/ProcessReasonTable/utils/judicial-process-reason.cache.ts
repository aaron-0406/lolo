import { QueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import { JudicialProcessReasonType } from '@/types/judicial/judicial-process-reason.types'

export const KEY_JUDICIAL_PROCESS_REASON_CACHE = 'key-judicial-process-reason-cache'

type QueryDataType = AxiosResponse<JudicialProcessReasonType[]> | undefined

const judicialProcessReasonCache = (queryClient: QueryClient) => {
  const createProcessReasonCache = (data: JudicialProcessReasonType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_PROCESS_REASON_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const editProcessReasonCache = (data: JudicialProcessReasonType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_PROCESS_REASON_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((subject: JudicialProcessReasonType) => {
          if (subject.id === data.id) {
            return data
          }

          return subject
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteProcessReasonCache = (idSubject: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_PROCESS_REASON_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((subject: JudicialProcessReasonType) => subject.id !== parseInt(idSubject))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_JUDICIAL_PROCESS_REASON_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_JUDICIAL_PROCESS_REASON_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_JUDICIAL_PROCESS_REASON_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_JUDICIAL_PROCESS_REASON_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_JUDICIAL_PROCESS_REASON_CACHE, chb], context.old)
  }

  return {
    actions: {
      deleteProcessReasonCache,
      createProcessReasonCache,
      editProcessReasonCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default judicialProcessReasonCache
