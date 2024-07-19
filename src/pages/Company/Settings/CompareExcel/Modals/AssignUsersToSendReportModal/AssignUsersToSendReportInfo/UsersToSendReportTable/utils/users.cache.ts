import { AxiosResponse } from 'axios'
import { QueryClient } from 'react-query'
import { CustomerUserType } from '../../../../../../../../../shared/types/dash/customer-user.type';

export const KEY_USUARIOS_SCHUDULED_NOTIFICATIONS_CACHE = 'key-usuarios-schuduled-notifications-cache'

type QueryDataType = AxiosResponse<CustomerUserType[]> | undefined

const extUsuariosCache = (queryClient: QueryClient) => {
  const createUserCache = (data: CustomerUserType) => {
    queryClient.setQueryData<QueryDataType>(KEY_USUARIOS_SCHUDULED_NOTIFICATIONS_CACHE, (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const editUserCache = (data: CustomerUserType) => {
    queryClient.setQueryData<QueryDataType>(KEY_USUARIOS_SCHUDULED_NOTIFICATIONS_CACHE, (old) => {
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
    queryClient.setQueryData<QueryDataType>(KEY_USUARIOS_SCHUDULED_NOTIFICATIONS_CACHE, (old) => {
      if (old) {
        const dataUpdated = old.data.filter((user: CustomerUserType) => user.id !== parseInt(idUser))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async () => {
    await queryClient.refetchQueries(KEY_USUARIOS_SCHUDULED_NOTIFICATIONS_CACHE)
  }

  const onMutateCache = async () => {
    const old = queryClient.getQueryData(KEY_USUARIOS_SCHUDULED_NOTIFICATIONS_CACHE)
    if (!old) {
      await queryClient.prefetchQuery(KEY_USUARIOS_SCHUDULED_NOTIFICATIONS_CACHE)
    }

    return { old }
  }

  const onSettledCache = () => {
    queryClient.cancelQueries(KEY_USUARIOS_SCHUDULED_NOTIFICATIONS_CACHE)
  }

  const onErrorCache = (context: { old: QueryDataType }) => {
    queryClient.setQueryData(KEY_USUARIOS_SCHUDULED_NOTIFICATIONS_CACHE, context.old)
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
