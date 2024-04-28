import { QueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import { JudicialBinProceduralStageType } from '@/types/judicial/judicial-bin-procedural-stage.type'

export const KEY_JUDICIAL_BIN_PROCEDURAL_STAGE_CACHE = 'key-judicial-bin-procedural-stage-cache'

type QueryDataType = AxiosResponse<JudicialBinProceduralStageType[]> | undefined

const extBinProceduralStagesCache = (queryClient: QueryClient) => {
  const createBinProceduralStageCache = (data: JudicialBinProceduralStageType) => {
    queryClient.setQueryData<QueryDataType>(
      [KEY_JUDICIAL_BIN_PROCEDURAL_STAGE_CACHE, data.customerHasBankId],
      (old) => {
        if (old) {
          return { ...old, data: [...old.data, data] }
        }
      }
    )
  }

  const editBinProceduralStageCache = (data: JudicialBinProceduralStageType) => {
    queryClient.setQueryData<QueryDataType>(
      [KEY_JUDICIAL_BIN_PROCEDURAL_STAGE_CACHE, data.customerHasBankId],
      (old) => {
        if (old) {
          const dataUpdated = old.data.map((action: JudicialBinProceduralStageType) => {
            if (action.id === data.id) {
              return data
            }

            return action
          })

          return { ...old, data: dataUpdated }
        }
      }
    )
  }

  const deleteBinProceduralStageCache = (idBinProceduralStage: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_BIN_PROCEDURAL_STAGE_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter(
          (user: JudicialBinProceduralStageType) => user.id !== parseInt(idBinProceduralStage)
        )
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_JUDICIAL_BIN_PROCEDURAL_STAGE_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_JUDICIAL_BIN_PROCEDURAL_STAGE_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_JUDICIAL_BIN_PROCEDURAL_STAGE_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_JUDICIAL_BIN_PROCEDURAL_STAGE_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_JUDICIAL_BIN_PROCEDURAL_STAGE_CACHE, chb], context.old)
  }

  return {
    actions: {
      createBinProceduralStageCache,
      editBinProceduralStageCache,
      deleteBinProceduralStageCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default extBinProceduralStagesCache
