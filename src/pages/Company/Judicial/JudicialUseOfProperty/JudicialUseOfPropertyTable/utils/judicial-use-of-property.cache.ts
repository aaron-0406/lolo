import { AxiosResponse } from "axios"; 
import { QueryClient } from "react-query";
import { JudicialUseOfPropertyType } from "@/types/judicial/judicial-use-of-property.type";

export const KEY_JUDICIAL_USE_OF_PROPERTY_CACHE = 'key-judicial-use-of-property-cache'

type QueryDataType = AxiosResponse<JudicialUseOfPropertyType[]> | undefined

const judicialUseOfPropertyCache = (queryClient: QueryClient) => {
  const createUseOfPropertyCache = (data: JudicialUseOfPropertyType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_USE_OF_PROPERTY_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    }) 
  }

  const editUseOfPropertyCache = (data: JudicialUseOfPropertyType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_USE_OF_PROPERTY_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((UseOfProperty: JudicialUseOfPropertyType) => {
          if (UseOfProperty.id === data.id) {
            return data
          }

          return UseOfProperty
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteUseOfPropertyCache = (idUseOfProperty: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_USE_OF_PROPERTY_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((UseOfProperty: JudicialUseOfPropertyType) => UseOfProperty.id !== parseInt(idUseOfProperty))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_JUDICIAL_USE_OF_PROPERTY_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_JUDICIAL_USE_OF_PROPERTY_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_JUDICIAL_USE_OF_PROPERTY_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_JUDICIAL_USE_OF_PROPERTY_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_JUDICIAL_USE_OF_PROPERTY_CACHE, chb], context.old)
  }

  return {
    actions: {
      createUseOfPropertyCache,
      editUseOfPropertyCache,
      deleteUseOfPropertyCache,
    }, 
    onRefetchQueryCache, 
    onMutateCache,
    onSettledCache,
    onErrorCache
  }
}

export default judicialUseOfPropertyCache