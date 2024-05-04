import { AxiosResponse } from 'axios'
import { QueryClient } from 'react-query'
import { JudicialObsTypeType } from '@/types/judicial/judicial-obs-type.type'

export const KEY_JUDICIAL_OBS_TYPE_CACHE = 'key-judicial-obs-type-cache'

type QueryDataType = AxiosResponse<JudicialObsTypeType[]> | undefined

const judicialObsTypeCache = (queryClient: QueryClient) => {
  const createObsTypeCache = (data: JudicialObsTypeType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_OBS_TYPE_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const editObsTypeCache = (data: JudicialObsTypeType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_OBS_TYPE_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((obsType: JudicialObsTypeType) => {
          if (obsType.id === data.id) {
            return data
          }

          return obsType
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteObsTypeCache = (idObsType: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_OBS_TYPE_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((obsType: JudicialObsTypeType) => obsType.id !== parseInt(idObsType))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_JUDICIAL_OBS_TYPE_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_JUDICIAL_OBS_TYPE_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_JUDICIAL_OBS_TYPE_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_JUDICIAL_OBS_TYPE_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_JUDICIAL_OBS_TYPE_CACHE, chb], context.old)
  }

  return {
    actions: {
      createObsTypeCache,
      editObsTypeCache,
      deleteObsTypeCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default judicialObsTypeCache
