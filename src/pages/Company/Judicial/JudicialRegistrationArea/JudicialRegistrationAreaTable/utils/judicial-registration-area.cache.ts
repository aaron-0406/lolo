import { AxiosResponse } from "axios"; 
import { QueryClient } from "react-query";
import { JudicialRegistrationAreaType } from "@/types/judicial/judicial-registration-area.type";

export const KEY_JUDICIAL_REGISTRATION_AREA_CACHE = 'key-judicial-registration-area-cache'

type QueryDataType = AxiosResponse<JudicialRegistrationAreaType[]> | undefined

const judicialRegistrationAreaCache = (queryClient: QueryClient) => {
  const createRegistrationAreaCache = (data: JudicialRegistrationAreaType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_REGISTRATION_AREA_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    }) 
  }

  const editRegistrationAreaCache = (data: JudicialRegistrationAreaType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_REGISTRATION_AREA_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((RegistrationArea: JudicialRegistrationAreaType) => {
          if (RegistrationArea.id === data.id) {
            return data
          }

          return RegistrationArea
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteRegistrationAreaCache = (idRegistrationArea: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_REGISTRATION_AREA_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((RegistrationArea: JudicialRegistrationAreaType) => RegistrationArea.id !== parseInt(idRegistrationArea))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_JUDICIAL_REGISTRATION_AREA_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_JUDICIAL_REGISTRATION_AREA_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_JUDICIAL_REGISTRATION_AREA_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_JUDICIAL_REGISTRATION_AREA_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_JUDICIAL_REGISTRATION_AREA_CACHE, chb], context.old)
  }

  return {
    actions: {
      createRegistrationAreaCache,
      editRegistrationAreaCache,
      deleteRegistrationAreaCache,
    }, 
    onRefetchQueryCache, 
    onMutateCache,
    onSettledCache,
    onErrorCache
  }
}

export default judicialRegistrationAreaCache