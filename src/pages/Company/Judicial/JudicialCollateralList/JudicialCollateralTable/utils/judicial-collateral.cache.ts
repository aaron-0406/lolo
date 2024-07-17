import { JudicialCollateralType } from '@/types/judicial/judicial-collateral.type'
import { AxiosResponse } from 'axios'
import { QueryClient } from 'react-query'

export const KEY_JUDICIAL_COLLATERAL_CACHE = 'key-judicial-collateral-cache'

type QueryDataType = AxiosResponse<JudicialCollateralType[]> | undefined

const judicialCollateralCache = (queryClient: QueryClient) => {
  const createJudicialCollateralCache = (data: JudicialCollateralType, caseFileId: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_COLLATERAL_CACHE, caseFileId], (old) => {
      if (old) return { ...old, data: [...old?.data, data] }
    })
  }

  const editCollateralCache = (data: JudicialCollateralType, caseFileId: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_COLLATERAL_CACHE, caseFileId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((Collateral: JudicialCollateralType) => {
          if (Collateral.id === data.id) {
            return data
          }

          return Collateral
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteCollateralCache = (id: string, caseFileId: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_COLLATERAL_CACHE, caseFileId], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((collateral: JudicialCollateralType) => collateral.id !== parseInt(id))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (caseFileId: number) => {
    await queryClient.refetchQueries([KEY_JUDICIAL_COLLATERAL_CACHE, caseFileId])
  }

  const onMutateCache = async (caseFileId: number) => {
    const old = queryClient.getQueryData([KEY_JUDICIAL_COLLATERAL_CACHE, caseFileId])
    if (!old) {
      await queryClient.prefetchQuery([KEY_JUDICIAL_COLLATERAL_CACHE, caseFileId])
    }

    return { old }
  }

  const onSettledCache = (caseFileId: number) => {
    queryClient.cancelQueries([KEY_JUDICIAL_COLLATERAL_CACHE, caseFileId])
  }

  const onErrorCache = (context: { old: QueryDataType }, caseFileId: number) => {
    queryClient.setQueryData([KEY_JUDICIAL_COLLATERAL_CACHE, caseFileId], context.old)
  }

  return {
    actions: {
      createJudicialCollateralCache,
      editCollateralCache,
      deleteCollateralCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default judicialCollateralCache
