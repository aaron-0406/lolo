import { AxiosResponse } from 'axios'
import { QueryClient } from 'react-query'
import { ExtOfficeType } from '@/types/extrajudicial/ext-office.type'

export const KEY_EXT_OFFICE_CACHE = 'key-ext-office-cache'

type QueryDataType = AxiosResponse<ExtOfficeType[]> | undefined

const dashOfficeCache = (queryClient: QueryClient) => {
  const createOfficeCache = (data: ExtOfficeType) => {
    queryClient.setQueryData<QueryDataType>(KEY_EXT_OFFICE_CACHE, (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const editOfficeCache = (data: ExtOfficeType) => {
    queryClient.setQueryData<QueryDataType>(KEY_EXT_OFFICE_CACHE, (old) => {
      if (old) {
        const dataUpdated = old.data.map((office: ExtOfficeType) => {
          if (office.id === data.id) {
            return data
          }

          return office
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteOfficeCache = (id: string) => {
    queryClient.setQueryData<QueryDataType>(KEY_EXT_OFFICE_CACHE, (old) => {
      if (old) {
        const dataUpdated = old.data.filter((office: ExtOfficeType) => office.id !== parseInt(id))
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async () => {
    await queryClient.refetchQueries(KEY_EXT_OFFICE_CACHE)
  }

  const onMutateCache = async () => {
    const old = queryClient.getQueryData(KEY_EXT_OFFICE_CACHE)
    if (!old) {
      await queryClient.prefetchQuery(KEY_EXT_OFFICE_CACHE)
    }

    return { old }
  }

  const onSettledCache = () => {
    queryClient.cancelQueries(KEY_EXT_OFFICE_CACHE)
  }

  const onErrorCache = (context: { old: QueryDataType }) => {
    queryClient.setQueryData(KEY_EXT_OFFICE_CACHE, context.old)
  }

  return {
    actions: {
      createOfficeCache,
      editOfficeCache,
      deleteOfficeCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default dashOfficeCache
