import { AxiosResponse } from "axios"; 
import { QueryClient } from "react-query";
import { JudicialCollateralFilesType } from "@/types/judicial/judicial-collateral-files.type";

export const KEY_JUDICIAL_COLLATERAL_FILES_CACHE = 'key-judicial-collateral-files-cache'

type QueryDataType = AxiosResponse<JudicialCollateralFilesType[]> | undefined

const judicialCollateralFilesCache = (queryClient: QueryClient) => {
  const createCollateralFilesCache = (data: JudicialCollateralFilesType[], collateralId: number, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_COLLATERAL_FILES_CACHE, collateralId, chb], (old) => {
      if (old && old.data) {
        const newData = [...old.data, ...data.filter(d => !old.data.some(od => od.id === d.id))];
        return { ...old, data: newData };
      } else {
        return old;
      }
    });
  };

  const editCollateralFilesCache = (data: JudicialCollateralFilesType) => {
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_COLLATERAL_FILES_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((CollateralFiles: JudicialCollateralFilesType) => {
          if (CollateralFiles.id === data.id) {
            return data
          }

          return CollateralFiles
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteCollateralFilesCache = (idCollateralFiles: string, collateralId: number, chb: number) => { 
    queryClient.setQueryData<QueryDataType>([KEY_JUDICIAL_COLLATERAL_FILES_CACHE, collateralId, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((CollateralFiles: JudicialCollateralFilesType) => CollateralFiles.id !== parseInt(idCollateralFiles))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number, collateralId: number) => {
    await queryClient.refetchQueries([KEY_JUDICIAL_COLLATERAL_FILES_CACHE, collateralId, chb])
  }

  const onMutateCache = async (chb: number, collateralId: number) => {
    const old = queryClient.getQueryData([KEY_JUDICIAL_COLLATERAL_FILES_CACHE, collateralId, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_JUDICIAL_COLLATERAL_FILES_CACHE, collateralId, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number, collateralId: number) => {
    queryClient.cancelQueries([KEY_JUDICIAL_COLLATERAL_FILES_CACHE, collateralId, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_JUDICIAL_COLLATERAL_FILES_CACHE, chb], context.old)
  }

  return {
    actions: {
      createCollateralFilesCache,
      editCollateralFilesCache,
      deleteCollateralFilesCache,
    }, 
    onRefetchQueryCache, 
    onMutateCache,
    onSettledCache,
    onErrorCache
  }
}

export default judicialCollateralFilesCache