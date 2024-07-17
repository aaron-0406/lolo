import { AxiosResponse } from "axios"; 
import { QueryClient } from "react-query";
import {  JudicialCollateralChargesEncumbrancesType } from "@/types/judicial/judicial-collateral-charges-encumbrances.type";

export const KEY_JUDICIAL_CHARGES_ENCUMBRANCES_CACHE = 'key-judicial-Charges-Encumbrances-cache'

type QueryDataType = AxiosResponse<JudicialCollateralChargesEncumbrancesType[]> | undefined

const judicialChargesEncumbrancesCache = (queryClient: QueryClient) => {
  const createChargesEncumbrancesCache = (data: JudicialCollateralChargesEncumbrancesType, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_CHARGES_ENCUMBRANCES_CACHE, chb], (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    }) 
  }

  const editChargesEncumbrancesCache = (data: JudicialCollateralChargesEncumbrancesType, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_CHARGES_ENCUMBRANCES_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.map((ChargesEncumbrances: JudicialCollateralChargesEncumbrancesType) => {
          if (ChargesEncumbrances.id === data.id) {
            return data
          }

          return ChargesEncumbrances
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteChargesEncumbrancesCache = (idChargesEncumbrances: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_CHARGES_ENCUMBRANCES_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((ChargesEncumbrances: JudicialCollateralChargesEncumbrancesType) => ChargesEncumbrances.id !== parseInt(idChargesEncumbrances))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_JUDICIAL_CHARGES_ENCUMBRANCES_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_JUDICIAL_CHARGES_ENCUMBRANCES_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_JUDICIAL_CHARGES_ENCUMBRANCES_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_JUDICIAL_CHARGES_ENCUMBRANCES_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_JUDICIAL_CHARGES_ENCUMBRANCES_CACHE, chb], context.old)
  }

  return {
    actions: {
      createChargesEncumbrancesCache,
      editChargesEncumbrancesCache,
      deleteChargesEncumbrancesCache,
    }, 
    onRefetchQueryCache, 
    onMutateCache,
    onSettledCache,
    onErrorCache
  }
}

export default judicialChargesEncumbrancesCache