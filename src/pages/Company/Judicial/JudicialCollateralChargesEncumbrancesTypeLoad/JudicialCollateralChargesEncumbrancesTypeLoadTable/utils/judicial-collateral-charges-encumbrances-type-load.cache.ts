import { AxiosResponse } from "axios"; 
import { QueryClient } from "react-query";
import { JudicialCollateralChargesEncumbrancesTypeLoadType } from "@/types/judicial/judicial-collateral-charges-encumbrances-type-load.type";

export const KEY_JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_CACHE = 'key-judicial-collateral-charges-encumbrances-type-load-cache'

type QueryDataType = AxiosResponse<JudicialCollateralChargesEncumbrancesTypeLoadType[]> | undefined

const JudicialCollateralChargesEncumbrancesTypeLoadCache = (queryClient: QueryClient) => {
  const createChargesEncumbrancesTypeLoadCache = (data: JudicialCollateralChargesEncumbrancesTypeLoadType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    }) 
  }

  const editChargesEncumbrancesTypeLoadCache = (data: JudicialCollateralChargesEncumbrancesTypeLoadType) => {
    queryClient.setQueryData<QueryDataType>(
      [KEY_JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_CACHE, data.customerHasBankId],
      (old) => {
        if (old) {
          const dataUpdated = old.data.map(
            (ChargesEncumbrancesTypeLoad: JudicialCollateralChargesEncumbrancesTypeLoadType) => {
              if (ChargesEncumbrancesTypeLoad.id === data.id) {
                return data
              }

              return ChargesEncumbrancesTypeLoad
            }
          )

          return { ...old, data: dataUpdated }
        }
      }
    )
  }

  const deleteChargesEncumbrancesTypeLoadCache = (idChargesEncumbrancesTypeLoad: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>(
      [KEY_JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_CACHE, chb],
      (old) => {
        if (old) {
          const dataUpdated = old.data.filter(
            (ChargesEncumbrancesTypeLoad: JudicialCollateralChargesEncumbrancesTypeLoadType) =>
              ChargesEncumbrancesTypeLoad.id !== parseInt(idChargesEncumbrancesTypeLoad)
          )
          return { ...old, data: dataUpdated }
        }
      }
    )
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_CACHE, chb], context.old)
  }

  return {
    actions: {
      createChargesEncumbrancesTypeLoadCache,
      editChargesEncumbrancesTypeLoadCache,
      deleteChargesEncumbrancesTypeLoadCache,
    }, 
    onRefetchQueryCache, 
    onMutateCache,
    onSettledCache,
    onErrorCache
  }
}

export default JudicialCollateralChargesEncumbrancesTypeLoadCache