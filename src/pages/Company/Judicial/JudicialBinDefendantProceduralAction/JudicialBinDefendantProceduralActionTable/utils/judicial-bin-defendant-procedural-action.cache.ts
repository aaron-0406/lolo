import { QueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import { JudicialBinDefendantProceduralActionType } from '@/types/judicial/judicial-bin-defendant-procedural-action.type'

export const KEY_JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_CACHE = 'key-judicial-bin-defendant-procedural-action-cache'

type QueryDataType = AxiosResponse<JudicialBinDefendantProceduralActionType[]> | undefined

const extBinDefendantProceduralActionsCache = (queryClient: QueryClient) => {
  const createBinDefendantProceduralActionCache = (data: JudicialBinDefendantProceduralActionType) => {
    queryClient.setQueryData<QueryDataType>(
      [KEY_JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_CACHE, data.customerHasBankId],
      (old) => {
        if (old) {
          return { ...old, data: [...old.data, data] }
        }
      }
    )
  }

  const editBinDefendantProceduralActionCache = (data: JudicialBinDefendantProceduralActionType) => {
    queryClient.setQueryData<QueryDataType>(
      [KEY_JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_CACHE, data.customerHasBankId],
      (old) => {
        if (old) {
          const dataUpdated = old.data.map((action: JudicialBinDefendantProceduralActionType) => {
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

  const deleteBinDefendantProceduralActionCache = (idBinDefendantProceduralAction: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter(
          (user: JudicialBinDefendantProceduralActionType) => user.id !== parseInt(idBinDefendantProceduralAction)
        )
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_CACHE, chb], context.old)
  }

  return {
    actions: {
      createBinDefendantProceduralActionCache,
      editBinDefendantProceduralActionCache,
      deleteBinDefendantProceduralActionCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default extBinDefendantProceduralActionsCache
