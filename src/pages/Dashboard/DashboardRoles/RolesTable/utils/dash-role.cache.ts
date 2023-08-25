import { QueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import { RoleType } from '../../../../../shared/types/dash/role.type'

export const KEY_DASH_ROLES_CACHE = 'key-dash-roles-cache'

type QueryDataType = AxiosResponse<RoleType[]> | undefined

const dashRoleCache = (queryClient: QueryClient) => {
  const createRoleCache = (data: RoleType) => {
    queryClient.setQueryData<QueryDataType>([KEY_DASH_ROLES_CACHE], (old) => {
      if (old) return { ...old, data: [...old.data, data] }
    })
  }

  const editRoleCache = (data: RoleType) => {
    queryClient.setQueryData<QueryDataType>([KEY_DASH_ROLES_CACHE], (old) => {
      if (old) {
        const dataUpdated = old.data.map((role: RoleType) => {
          if (role.id === data.id) return data
          return role
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteRoleCache = (idRole: string) => {
    queryClient.setQueryData<QueryDataType>([KEY_DASH_ROLES_CACHE], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((role: RoleType) => role.id !== parseInt(idRole))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async () => {
    await queryClient.refetchQueries([KEY_DASH_ROLES_CACHE])
  }

  const onMutateCache = async () => {
    const old = queryClient.getQueryData([KEY_DASH_ROLES_CACHE])
    if (!old) {
      await queryClient.prefetchQuery([KEY_DASH_ROLES_CACHE])
    }

    return { old }
  }

  const onSettledCache = () => {
    queryClient.cancelQueries([KEY_DASH_ROLES_CACHE])
  }

  const onErrorCache = (context: { old: QueryDataType }) => {
    queryClient.setQueryData([KEY_DASH_ROLES_CACHE], context.old)
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
