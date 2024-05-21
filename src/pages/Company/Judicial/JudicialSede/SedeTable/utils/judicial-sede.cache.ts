import { AxiosResponse } from 'axios'
import { QueryClient } from 'react-query'
import { JudicialSedeType } from '@/types/judicial/judicial-sede.type'

export const KEY_JUDICIAL_SEDE_CACHE = 'key-judicial-sede-cache'

type QueryDataType = AxiosResponse<JudicialSedeType[]> | undefined

const judicialSedeCache = (queryClient: QueryClient) => {
  const createSedeCache = (data: JudicialSedeType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_SEDE_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const editSedeCache = (data: JudicialSedeType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_SEDE_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((Sede: JudicialSedeType) => {
          if (Sede.id === data.id) {
            return data
          }

          return Sede
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteSedeCache = (idSede: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_SEDE_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((Sede: JudicialSedeType) => Sede.id !== parseInt(idSede))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_JUDICIAL_SEDE_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_JUDICIAL_SEDE_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_JUDICIAL_SEDE_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_JUDICIAL_SEDE_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_JUDICIAL_SEDE_CACHE, chb], context.old)
  }

  return {
    actions: {
      createSedeCache,
      editSedeCache,
      deleteSedeCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default judicialSedeCache
