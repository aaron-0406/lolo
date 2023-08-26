import { QueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import { PermissionType } from '@/types/dash/permission.type'

export const KEY_DASH_PERMISOS_CACHE = 'key-dash-permisos-cache'

type QueryDataType = AxiosResponse<PermissionType[]> | undefined

const dashPermissionCache = (queryClient: QueryClient) => {
  const createPermissionCache = (data: PermissionType) => {
    queryClient.setQueryData<QueryDataType>([KEY_DASH_PERMISOS_CACHE], (old) => {
      if (old) return { ...old, data: [...old.data, data] }
    })
  }

  const editPermissionCache = (data: PermissionType) => {
    queryClient.setQueryData<QueryDataType>([KEY_DASH_PERMISOS_CACHE], (old) => {
      if (old) {
        const dataUpdated = old.data.map((permission: PermissionType) => {
          if (permission.id === data.id) return data
          return permission
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deletePermissionCache = (idPermission: string) => {
    queryClient.setQueryData<QueryDataType>([KEY_DASH_PERMISOS_CACHE], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((permission: PermissionType) => permission.id !== parseInt(idPermission))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async () => {
    await queryClient.refetchQueries([KEY_DASH_PERMISOS_CACHE])
  }

  const onMutateCache = async () => {
    const old = queryClient.getQueryData([KEY_DASH_PERMISOS_CACHE])
    if (!old) {
      await queryClient.prefetchQuery([KEY_DASH_PERMISOS_CACHE])
    }

    return { old }
  }

  const onSettledCache = () => {
    queryClient.cancelQueries([KEY_DASH_PERMISOS_CACHE])
  }

  const onErrorCache = (context: { old: QueryDataType }) => {
    queryClient.setQueryData([KEY_DASH_PERMISOS_CACHE], context.old)
  }

  return {
    actions: {
      deletePermissionCache,
      createPermissionCache,
      editPermissionCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default dashPermissionCache
