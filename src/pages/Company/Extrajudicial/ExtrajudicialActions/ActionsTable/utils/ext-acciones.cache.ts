import { QueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import { ManagementActionType } from '@/types/extrajudicial/management-action.type'

export const KEY_EXT_COBRANZA_ACCIONES_CACHE = 'key-ext-cobranza-acciones-cache'

type QueryDataType = AxiosResponse<ManagementActionType[]> | undefined

const extAccionesCache = (queryClient: QueryClient) => {
  const createActionCache = (data: ManagementActionType) => {
    queryClient.setQueryData<QueryDataType>([KEY_EXT_COBRANZA_ACCIONES_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const editActionCache = (data: ManagementActionType) => {
    queryClient.setQueryData<QueryDataType>([KEY_EXT_COBRANZA_ACCIONES_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((action: ManagementActionType) => {
          if (action.id === data.id) {
            return data
          }

          return action
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteActionCache = (idAction: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_EXT_COBRANZA_ACCIONES_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((user: ManagementActionType) => user.id !== parseInt(idAction))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_EXT_COBRANZA_ACCIONES_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_EXT_COBRANZA_ACCIONES_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_EXT_COBRANZA_ACCIONES_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_EXT_COBRANZA_ACCIONES_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_EXT_COBRANZA_ACCIONES_CACHE, chb], context.old)
  }

  return {
    actions: {
      createActionCache,
      editActionCache,
      deleteActionCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default extAccionesCache
