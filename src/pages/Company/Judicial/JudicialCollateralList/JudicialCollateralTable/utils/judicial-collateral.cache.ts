import { JudicialCollateralType } from '@/types/judicial/judicial-collateral.type'
import { AxiosResponse } from 'axios'
import { QueryClient } from 'react-query'

export const KEY_JUDICIAL_COLLATERAL_CACHE = 'key-judicial-collateral-cache'

type QueryDataType = AxiosResponse<JudicialCollateralType[]> | undefined

const judicialCollateralCache = (queryClient: QueryClient) => {
  const createJudicialCollateralCache = (data: JudicialCollateralType, chb: number) => {
    queryClient.setQueryData<QueryDataType>(
      [KEY_JUDICIAL_COLLATERAL_CACHE, chb],
      (old) => {
        if(old) return {...old, data: [...old?.data, data]}
      }
    )
  }

  const editCollateralCache = (data: JudicialCollateralType,  chb: number) => {
    queryClient.setQueryData<QueryDataType>(
      [KEY_JUDICIAL_COLLATERAL_CACHE, chb],
      (old) => {
        if(old) {
          const dataUpdated = old.data.map((Collateral: JudicialCollateralType) => {
            if (Collateral.id === data.id) {
              return data
            }

            return Collateral
          })

          return { ...old, data: dataUpdated }
        }
      }
    )
  }

  const deleteCollateralCache = (id: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_COLLATERAL_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter(
          (collateral: JudicialCollateralType) => collateral.id !== parseInt(id) 
        )
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_JUDICIAL_COLLATERAL_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_JUDICIAL_COLLATERAL_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_JUDICIAL_COLLATERAL_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_JUDICIAL_COLLATERAL_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_JUDICIAL_COLLATERAL_CACHE, chb], context.old)
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
