import { QueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import { RoleType } from '@/types/dash/role.type'

export const KEY_DASH_ROLES_CACHE = 'key-dash-roles-cache'

type QueryDataType = AxiosResponse<RoleType[]> | undefined

const dashRoleCache = (queryClient: QueryClient) => {
  const createRoleCache = (data: RoleType) => {
    queryClient.setQueryData<QueryDataType>([KEY_DASH_ROLES_CACHE, data.customerId], (old) => {
      if (old) return { ...old, data: [...old.data, data] }
    })
  }

  const editRoleCache = (data: RoleType) => {
    queryClient.setQueryData<QueryDataType>([KEY_DASH_ROLES_CACHE, data.customerId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((role: RoleType) => {
          if (role.id === data.id) return data
          return role
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteRoleCache = (idRole: string, customerId: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_DASH_ROLES_CACHE, customerId], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((role: RoleType) => role.id !== parseInt(idRole))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (customerId: number) => {
    await queryClient.refetchQueries([KEY_DASH_ROLES_CACHE, customerId])
  }

  const onMutateCache = async (customerId: number) => {
    const old = queryClient.getQueryData([KEY_DASH_ROLES_CACHE, customerId])
    if (!old) {
      await queryClient.prefetchQuery([KEY_DASH_ROLES_CACHE, customerId])
    }

    return { old }
  }

  const onSettledCache = (customerId: number) => {
    queryClient.cancelQueries([KEY_DASH_ROLES_CACHE, customerId])
  }

  const onErrorCache = (context: { old: QueryDataType }, customerId: number) => {
    queryClient.setQueryData([KEY_DASH_ROLES_CACHE, customerId], context.old)
  }

  return {
    actions: {
      deleteRoleCache,
      createRoleCache,
      editRoleCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default dashRoleCache
