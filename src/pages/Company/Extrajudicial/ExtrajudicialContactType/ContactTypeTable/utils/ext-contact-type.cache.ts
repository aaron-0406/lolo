import { AxiosResponse } from 'axios'
import { QueryClient } from 'react-query'
import { ExtContactTypeType } from '@/types/extrajudicial/ext-contact-type.type'

export const KEY_EXT_CONTACT_TYPE_CACHE = 'key-ext-contact-type-cache'

type QueryDataType = AxiosResponse<ExtContactTypeType[]> | undefined

const extContactTypeCache = (queryClient: QueryClient) => {
  const createContactTypeCache = (data: ExtContactTypeType) => {
    queryClient.setQueryData<QueryDataType>([KEY_EXT_CONTACT_TYPE_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        return { ...old, data: [...old.data, data] }
      }
    })
  }

  const editContactTypeCache = (data: ExtContactTypeType) => {
    queryClient.setQueryData<QueryDataType>([KEY_EXT_CONTACT_TYPE_CACHE, data.customerHasBankId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((contactType: ExtContactTypeType) => {
          if (contactType.id === data.id) {
            return data
          }

          return contactType
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteContactTypeCache = (idContactType: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_EXT_CONTACT_TYPE_CACHE, chb], (old) => {
      if (old) {
        const dataUpdated = old.data.filter(
          (contactType: ExtContactTypeType) => contactType.id !== parseInt(idContactType)
        )
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_EXT_CONTACT_TYPE_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_EXT_CONTACT_TYPE_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_EXT_CONTACT_TYPE_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_EXT_CONTACT_TYPE_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_EXT_CONTACT_TYPE_CACHE, chb], context.old)
  }

  return {
    actions: {
      createContactTypeCache,
      editContactTypeCache,
      deleteContactTypeCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default extContactTypeCache
