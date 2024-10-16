import { QueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import { JudicialProceduralWayType } from '@/types/judicial/judicial-procedural-way.type'

export const KEY_JUDICIAL_PROCEDURAL_WAY_CACHE = 'key-judicial-procedural-way-cache'

type QueryDataType = AxiosResponse<JudicialProceduralWayType[]> | undefined

const judicialProceduralWayCache = (queryClient: QueryClient) => {
  const createProceduralWayCache = (data: JudicialProceduralWayType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_PROCEDURAL_WAY_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const editProceduralWayCache = (data: JudicialProceduralWayType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_PROCEDURAL_WAY_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((proceduralWay: JudicialProceduralWayType) => {
          if (proceduralWay.id === data.id) {
            return data
          }

          return proceduralWay
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteProceduralWayCache = (idProceduralWay: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_PROCEDURAL_WAY_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter(
          (proceduralWay: JudicialProceduralWayType) => proceduralWay.id !== parseInt(idProceduralWay)
        )
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_JUDICIAL_PROCEDURAL_WAY_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_JUDICIAL_PROCEDURAL_WAY_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_JUDICIAL_PROCEDURAL_WAY_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_JUDICIAL_PROCEDURAL_WAY_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_JUDICIAL_PROCEDURAL_WAY_CACHE, chb], context.old)
  }

  return {
    actions: {
      deleteProceduralWayCache,
      createProceduralWayCache,
      editProceduralWayCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default judicialProceduralWayCache
