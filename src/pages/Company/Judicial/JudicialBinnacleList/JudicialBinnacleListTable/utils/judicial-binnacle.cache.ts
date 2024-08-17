import { QueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import { JudicialBinnacleType } from '@/types/judicial/judicial-binnacle.type'

export const KEY_JUDICIAL_URL_BINNACLE_CODE_CACHE = 'key-judicial-url-binnacle-code-cache'

type QueryDataType = AxiosResponse<JudicialBinnacleType[]> | undefined

const judicialBinnacleCache = (queryClient: QueryClient) => {
  const createJudicialBinnacleCache = (data: JudicialBinnacleType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_URL_BINNACLE_CODE_CACHE, data.judicialFileCaseId], (old) => {
      if (old) {
        return { ...old, data: [data, ...old.data] }
      }
    })
  }

  const editJudicialBinnacleCache = (data: JudicialBinnacleType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_URL_BINNACLE_CODE_CACHE, data.judicialFileCaseId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((binnacle: JudicialBinnacleType) => {
          if (binnacle.id === data.id) {
            return data
          }

          return binnacle
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteJudicialBinnacleCache = (binnacleId: number, judicialFileCaseId: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_URL_BINNACLE_CODE_CACHE, judicialFileCaseId], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((binnacle: JudicialBinnacleType) => binnacle.id !== binnacleId)
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (judicialFileCaseId: number) => {
    await queryClient.refetchQueries([KEY_JUDICIAL_URL_BINNACLE_CODE_CACHE, judicialFileCaseId])
  }

  const onMutateCache = async (judicialFileCaseId: number) => {
    const old = queryClient.getQueryData([KEY_JUDICIAL_URL_BINNACLE_CODE_CACHE, judicialFileCaseId])
    if (!old) {
      await queryClient.prefetchQuery([KEY_JUDICIAL_URL_BINNACLE_CODE_CACHE, judicialFileCaseId])
    }

    return { old }
  }

  const onSettledCache = (judicialFileCaseId: number) => {
    queryClient.cancelQueries([KEY_JUDICIAL_URL_BINNACLE_CODE_CACHE, judicialFileCaseId])
  }

  const onErrorCache = (context: { old: QueryDataType }, judicialFileCaseId: number) => {
    queryClient.setQueryData([KEY_JUDICIAL_URL_BINNACLE_CODE_CACHE, judicialFileCaseId], context.old)
  }

  return {
    actions: {
      createJudicialBinnacleCache,
      editJudicialBinnacleCache,
      deleteJudicialBinnacleCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default judicialBinnacleCache
