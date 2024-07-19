import { AxiosResponse } from "axios"; 
import { QueryClient } from "react-query";
import { JudicialNotaryType } from "@/types/judicial/judicial-notary.type";

export const KEY_JUDICIAL_NOTARY_CACHE = 'key-judicial-notary-cache'

type QueryDataType = AxiosResponse<JudicialNotaryType[]> | undefined

const judicialNotaryCache = (queryClient: QueryClient) => {
  const createNotaryCache = (data: JudicialNotaryType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_NOTARY_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    }) 
  }

  const editNotaryCache = (data: JudicialNotaryType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_NOTARY_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((Notary: JudicialNotaryType) => {
          if (Notary.id === data.id) {
            return data
          }

          return Notary
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteNotaryCache = (idNotary: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_NOTARY_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((Notary: JudicialNotaryType) => Notary.id !== parseInt(idNotary))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_JUDICIAL_NOTARY_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_JUDICIAL_NOTARY_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_JUDICIAL_NOTARY_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_JUDICIAL_NOTARY_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_JUDICIAL_NOTARY_CACHE, chb], context.old)
  }

  return {
    actions: {
      createNotaryCache,
      editNotaryCache,
      deleteNotaryCache,
    }, 
    onRefetchQueryCache, 
    onMutateCache,
    onSettledCache,
    onErrorCache
  }
}

export default judicialNotaryCache