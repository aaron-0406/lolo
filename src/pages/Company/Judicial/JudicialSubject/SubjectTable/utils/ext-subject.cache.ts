import { QueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import { JudicialSubjectType } from '@/types/judicial/judicial-subject.type'

export const KEY_JUDICIAL_SUBJECT_CACHE = 'key-judicial-subject-cache'

type QueryDataType = AxiosResponse<JudicialSubjectType[]> | undefined

const extSubjectCache = (queryClient: QueryClient) => {
  const createSubjectCache = (data: JudicialSubjectType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_SUBJECT_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const editSubjectCache = (data: JudicialSubjectType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_SUBJECT_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((subject: JudicialSubjectType) => {
          if (subject.id === data.id) {
            return data
          }

          return subject
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteSubjectCache = (idSubject: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_SUBJECT_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((subject: JudicialSubjectType) => subject.id !== parseInt(idSubject))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_JUDICIAL_SUBJECT_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_JUDICIAL_SUBJECT_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_JUDICIAL_SUBJECT_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_JUDICIAL_SUBJECT_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_JUDICIAL_SUBJECT_CACHE, chb], context.old)
  }

  return {
    actions: {
      deleteSubjectCache,
      createSubjectCache,
      editSubjectCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default extSubjectCache
