import { AxiosResponse } from 'axios'
import { QueryClient } from 'react-query'
import { CustomerUserType } from '@/types/dash/customer-user.type'

export const KEY_EXT_USUARIOS_CACHE = 'key-ext-usuarios-cache'

type QueryDataType = AxiosResponse<CustomerUserType[]> | undefined

const extUsuariosCache = (queryClient: QueryClient) => {
  const createUserCache = (data: CustomerUserType) => {
    queryClient.setQueryData<QueryDataType>(KEY_EXT_USUARIOS_CACHE, (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const editUserCache = (data: CustomerUserType) => {
    queryClient.setQueryData<QueryDataType>(KEY_EXT_USUARIOS_CACHE, (old) => {
      if (old) {
        const dataUpdated = old.data.map((user: CustomerUserType) => {
          if (user.id === data.id) {
            return data
          }

          return user
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteUserCache = (idUser: string) => {
    queryClient.setQueryData<QueryDataType>(KEY_EXT_USUARIOS_CACHE, (old) => {
      if (old) {
        const dataUpdated = old.data.filter((user: CustomerUserType) => user.id !== parseInt(idUser))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async () => {
    await queryClient.refetchQueries(KEY_EXT_USUARIOS_CACHE)
  }

  const onMutateCache = async () => {
    const old = queryClient.getQueryData(KEY_EXT_USUARIOS_CACHE)
    if (!old) {
      await queryClient.prefetchQuery(KEY_EXT_USUARIOS_CACHE)
    }

    return { old }
  }

  const onSettledCache = () => {
    queryClient.cancelQueries(KEY_EXT_USUARIOS_CACHE)
  }

  const onErrorCache = (context: { old: QueryDataType }) => {
    queryClient.setQueryData(KEY_EXT_USUARIOS_CACHE, context.old)
  }

  return {
    actions: {
      createUserCache,
      editUserCache,
      deleteUserCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default extUsuariosCache
