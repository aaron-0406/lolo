import { QueryClient } from 'react-query'
import { BankType } from '../../../../../../../shared/types/dash/bank.type'
import { AxiosResponse } from 'axios'

export const KEY_DASH_BANKS_CACHE = 'key-dash-banks-cache'

type QueryDataType = AxiosResponse<BankType[]> | undefined

const dashBanksCache = (queryClient: QueryClient) => {
  
  const AddBankCache = (data: BankType) => {
    queryClient.setQueryData<QueryDataType>(KEY_DASH_BANKS_CACHE, (oldQueryData) => {
      if (oldQueryData) {
        console.log("2")
        return {
          ...oldQueryData,
          data: [...oldQueryData?.data, data],
        }
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

  const deleteBankCache = (idBank: string) => {
    queryClient.setQueryData<QueryDataType>([KEY_DASH_BANKS_CACHE], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((bank: BankType) => bank.id !== parseInt(idBank))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const data = queryClient.getQueryData<QueryDataType>([KEY_DASH_BANKS_CACHE])

  const onRefetchQueryBankCache = async () => {
    await queryClient.refetchQueries([KEY_DASH_BANKS_CACHE])
  }

  const onMutateBankCache = async () => {
    const old = queryClient.getQueryData([KEY_DASH_BANKS_CACHE])
    if (!old) {
      await queryClient.prefetchQuery([KEY_DASH_BANKS_CACHE])
    }

    return { old }
  }

  const onSettledBankCache = () => {
    queryClient.cancelQueries([KEY_DASH_BANKS_CACHE])
  }

  const onErrorBankCache = (context: { old: QueryDataType }) => {
    queryClient.setQueryData([KEY_DASH_BANKS_CACHE], context.old)
  }

  return {
    actions: {
      AddBankCache,
      editBankCache,
      deleteBankCache,
    },
    data,
    onRefetchQueryBankCache,
    onMutateBankCache,
    onSettledBankCache,
    onErrorBankCache,
  }
}

export default dashBanksCache
