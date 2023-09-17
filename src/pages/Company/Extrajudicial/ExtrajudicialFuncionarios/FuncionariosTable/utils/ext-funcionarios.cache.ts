import { AxiosResponse } from 'axios'
import { QueryClient } from 'react-query'
import { FuncionarioType } from '@/types/extrajudicial/funcionario.type'

export const KEY_EXT_COBRANZA_FUNCIONARIOS_CACHE = 'key-ext-cobranza-funcionarios-cache'

type QueryDataType = AxiosResponse<FuncionarioType[]> | undefined

const extFuncionariosCache = (queryClient: QueryClient) => {
  const createFuncionarioCache = (data: FuncionarioType) => {
    queryClient.setQueryData<QueryDataType>([KEY_EXT_COBRANZA_FUNCIONARIOS_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const editFuncionarioCache = (data: FuncionarioType) => {
    queryClient.setQueryData<QueryDataType>([KEY_EXT_COBRANZA_FUNCIONARIOS_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((funcionario: FuncionarioType) => {
          if (funcionario.id === data.id) {
            return data
          }

          return funcionario
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteFuncionarioCache = (idFuncionario: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_EXT_COBRANZA_FUNCIONARIOS_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((user: FuncionarioType) => user.id !== parseInt(idFuncionario))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_EXT_COBRANZA_FUNCIONARIOS_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_EXT_COBRANZA_FUNCIONARIOS_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_EXT_COBRANZA_FUNCIONARIOS_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_EXT_COBRANZA_FUNCIONARIOS_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_EXT_COBRANZA_FUNCIONARIOS_CACHE, chb], context.old)
  }

  return {
    actions: {
      createFuncionarioCache,
      editFuncionarioCache,
      deleteFuncionarioCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default extFuncionariosCache
