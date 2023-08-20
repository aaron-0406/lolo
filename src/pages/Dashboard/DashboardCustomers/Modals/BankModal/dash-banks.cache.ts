import { QueryClient } from 'react-query'
import { BankType } from '../../../../../shared/types/dash/bank.type'
import { AxiosResponse } from 'axios'

export const KEY_DASH_BANKS_CACHE = 'key-dash-banks-cache'

type QueryDataType = AxiosResponse<BankType[]> | undefined

const dashBanksCache = (queryClient: QueryClient) => {
  const AddBankCache = (data: BankType) => {
    queryClient.setQueryData<QueryDataType>(KEY_DASH_BANKS_CACHE, (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const editBankCache = (data: BankType) => {
    queryClient.setQueryData<QueryDataType>(KEY_DASH_BANKS_CACHE, (old) => {
      if (old) {
        const dataUpdated = old.data.map((bank: BankType) => {
          if (bank.id === data.id) {
            return data
          }

          return bank
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteBankCache = (idBank: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_DASH_BANKS_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((bank: BankType) => bank.id !== parseInt(idBank))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_DASH_BANKS_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_DASH_BANKS_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_DASH_BANKS_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_DASH_BANKS_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_DASH_BANKS_CACHE, chb], context.old)
  }

  return {
    actions: {
      AddBankCache,
      editBankCache,
      deleteBankCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default dashBanksCache
