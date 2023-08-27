import { QueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import { PermissionType } from '@/types/dash/permission.type'

export const KEY_DASH_PERMISOS_CACHE = 'key-dash-permisos-cache'

export type QueryDataType = AxiosResponse<PermissionType[]> | undefined

const dashPermissionCache = (queryClient: QueryClient) => {
  const createPermissionCache = (data: PermissionType, code: string) => {
    queryClient.setQueryData<QueryDataType>([KEY_DASH_PERMISOS_CACHE, code], (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const editPermissionCache = (data: PermissionType, code: string) => {
    queryClient.setQueryData<QueryDataType>([KEY_DASH_PERMISOS_CACHE, code], (old) => {
      if (old) {
        const dataUpdated = old.data.map((permission: PermissionType) => {
          if (permission.id === data.id) return data
          return permission
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deletePermissionCache = (idPermission: string, code: string) => {
    queryClient.setQueryData<QueryDataType>([KEY_DASH_PERMISOS_CACHE, code], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((permission: PermissionType) => permission.id !== parseInt(idPermission))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (code: string) => {
    await queryClient.refetchQueries([KEY_DASH_PERMISOS_CACHE, code])
  }

  const onMutateCache = async (code: string) => {
    const old = queryClient.getQueryData([KEY_DASH_PERMISOS_CACHE, code])
    if (!old) {
      await queryClient.prefetchQuery([KEY_DASH_PERMISOS_CACHE, code])
    }

    return { old }
  }

  const onSettledCache = (code: string) => {
    queryClient.cancelQueries([KEY_DASH_PERMISOS_CACHE, code])
  }

  const onErrorCache = (context: { old: QueryDataType }, code: string) => {
    queryClient.setQueryData([KEY_DASH_PERMISOS_CACHE, code], context.old)
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
