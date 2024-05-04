import { QueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import { JudicialObservationType } from '@/types/judicial/judicial-observation.type'

export const KEY_JUDICIAL_URL_OBSERVATION_CODE_CACHE = 'key-judicial-url-observation-code-cache'

type QueryDataType = AxiosResponse<JudicialObservationType[]> | undefined

const judicialObservationCache = (queryClient: QueryClient) => {
  const createJudicialObservationCache = (data: JudicialObservationType) => {
    queryClient.setQueryData<QueryDataType>(
      [KEY_JUDICIAL_URL_OBSERVATION_CODE_CACHE, data.judicialCaseFileId],
      (old) => {
        if (old) {
          return { ...old, data: [data, ...old.data] }
        }
      }
    )
  }

  const editJudicialObservationCache = (data: JudicialObservationType) => {
    queryClient.setQueryData<QueryDataType>(
      [KEY_JUDICIAL_URL_OBSERVATION_CODE_CACHE, data.judicialCaseFileId],
      (old) => {
        if (old) {
          const dataUpdated = old.data.map((observation: JudicialObservationType) => {
            if (observation.id === data.id) {
              return data
            }

            return observation
          })

          return { ...old, data: dataUpdated }
        }
      }
    )
  }

  const deleteJudicialObservationCache = (observationId: number, judicialFileCaseId: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_URL_OBSERVATION_CODE_CACHE, judicialFileCaseId], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((observation: JudicialObservationType) => observation.id !== observationId)
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (judicialFileCaseId: number) => {
    await queryClient.refetchQueries([KEY_JUDICIAL_URL_OBSERVATION_CODE_CACHE, judicialFileCaseId])
  }

  const onMutateCache = async (judicialFileCaseId: number) => {
    const old = queryClient.getQueryData([KEY_JUDICIAL_URL_OBSERVATION_CODE_CACHE, judicialFileCaseId])
    if (!old) {
      await queryClient.prefetchQuery([KEY_JUDICIAL_URL_OBSERVATION_CODE_CACHE, judicialFileCaseId])
    }

    return { old }
  }

  const onSettledCache = (judicialFileCaseId: number) => {
    queryClient.cancelQueries([KEY_JUDICIAL_URL_OBSERVATION_CODE_CACHE, judicialFileCaseId])
  }

  const onErrorCache = (context: { old: QueryDataType }, judicialFileCaseId: number) => {
    queryClient.setQueryData([KEY_JUDICIAL_URL_OBSERVATION_CODE_CACHE, judicialFileCaseId], context.old)
  }

  return {
    actions: {
      createJudicialObservationCache,
      editJudicialObservationCache,
      deleteJudicialObservationCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default judicialObservationCache
