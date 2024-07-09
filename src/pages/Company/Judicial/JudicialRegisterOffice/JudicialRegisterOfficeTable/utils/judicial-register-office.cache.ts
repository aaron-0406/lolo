import { AxiosResponse } from "axios"; 
import { QueryClient } from "react-query";
import { JudicialRegisterOfficeType } from "@/types/judicial/judicial-register-office.type";

export const KEY_JUDICIAL_REGISTER_OFFICE_CACHE = 'key-judicial-register-office-cache'

type QueryDataType = AxiosResponse<JudicialRegisterOfficeType[]> | undefined

const judicialRegisterOfficeCache = (queryClient: QueryClient) => {
  const createRegisterOfficeCache = (data: JudicialRegisterOfficeType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_REGISTER_OFFICE_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    }) 
  }

  const editRegisterOfficeCache = (data: JudicialRegisterOfficeType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_REGISTER_OFFICE_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((RegisterOffice: JudicialRegisterOfficeType) => {
          if (RegisterOffice.id === data.id) {
            return data
          }

          return RegisterOffice
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteRegisterOfficeCache = (idRegisterOffice: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_REGISTER_OFFICE_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((RegisterOffice: JudicialRegisterOfficeType) => RegisterOffice.id !== parseInt(idRegisterOffice))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_JUDICIAL_REGISTER_OFFICE_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_JUDICIAL_REGISTER_OFFICE_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_JUDICIAL_REGISTER_OFFICE_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_JUDICIAL_REGISTER_OFFICE_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_JUDICIAL_REGISTER_OFFICE_CACHE, chb], context.old)
  }

  return {
    actions: {
      createRegisterOfficeCache,
      editRegisterOfficeCache,
      deleteRegisterOfficeCache,
    }, 
    onRefetchQueryCache, 
    onMutateCache,
    onSettledCache,
    onErrorCache
  }
}

export default judicialRegisterOfficeCache