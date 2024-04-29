import { QueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import { JudicialBinTypeBinnacleType } from '@/types/judicial/judicial-bin-type-binnacle.type'

export const KEY_JUDICIAL_BIN_TYPE_BINNACLE_CACHE = 'key-judicial-bin-type-binnacle-cache'

type QueryDataType = AxiosResponse<JudicialBinTypeBinnacleType[]> | undefined

const extBinTypeBinnaclesCache = (queryClient: QueryClient) => {
  const createBinTypeBinnacleCache = (data: JudicialBinTypeBinnacleType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_BIN_TYPE_BINNACLE_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const editBinTypeBinnacleCache = (data: JudicialBinTypeBinnacleType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_BIN_TYPE_BINNACLE_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((action: JudicialBinTypeBinnacleType) => {
          if (action.id === data.id) {
            return data
          }

          return action
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteBinTypeBinnacleCache = (idBinTypeBinnacle: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_BIN_TYPE_BINNACLE_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter(
          (user: JudicialBinTypeBinnacleType) => user.id !== parseInt(idBinTypeBinnacle)
        )
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_JUDICIAL_BIN_TYPE_BINNACLE_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_JUDICIAL_BIN_TYPE_BINNACLE_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_JUDICIAL_BIN_TYPE_BINNACLE_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_JUDICIAL_BIN_TYPE_BINNACLE_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_JUDICIAL_BIN_TYPE_BINNACLE_CACHE, chb], context.old)
  }

  return {
    actions: {
      createBinTypeBinnacleCache,
      editBinTypeBinnacleCache,
      deleteBinTypeBinnacleCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default extBinTypeBinnaclesCache
