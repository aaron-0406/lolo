import { ExtContactType } from '@/types/extrajudicial/ext-contact.type'
import { AxiosResponse } from 'axios'
import { QueryClient } from 'react-query'

export const KEY_COBRANZA_URL_CONTACT_CODE_CACHE = 'key-cobranza-url-contact-code-cache'

type QueryDataType = AxiosResponse<ExtContactType[]> | undefined

const companyContactsCache = (queryClient: QueryClient) => {
  const createCobranzaContactCache = (data: ExtContactType) => {
    queryClient.setQueryData<QueryDataType>([KEY_COBRANZA_URL_CONTACT_CODE_CACHE, data.clientId], (old) => {
      if (old) {
        return { ...old, data: [data, ...old.data] }
      }
    })
  }

  const editCobranzaContactCache = (data: ExtContactType) => {
    queryClient.setQueryData<QueryDataType>([KEY_COBRANZA_URL_CONTACT_CODE_CACHE, data.clientId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((contact: ExtContactType) => {
          if (contact.id === data.id) {
            return data
          }

          return contact
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteCobranzaContactCache = (contactId: number, clientId: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_COBRANZA_URL_CONTACT_CODE_CACHE, clientId], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((contact: ExtContactType) => contact.id !== contactId)
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (clientId: number) => {
    await queryClient.refetchQueries([KEY_COBRANZA_URL_CONTACT_CODE_CACHE, clientId])
  }

  const onMutateCache = async (clientId: number) => {
    const old = queryClient.getQueryData([KEY_COBRANZA_URL_CONTACT_CODE_CACHE, clientId])
    if (!old) {
      await queryClient.prefetchQuery([KEY_COBRANZA_URL_CONTACT_CODE_CACHE, clientId])
    }

    return { old }
  }

  const onSettledCache = (clientId: number) => {
    queryClient.cancelQueries([KEY_COBRANZA_URL_CONTACT_CODE_CACHE, clientId])
  }

  const onErrorCache = (context: { old: QueryDataType }, clientId: number) => {
    queryClient.setQueryData([KEY_COBRANZA_URL_CONTACT_CODE_CACHE, clientId], context.old)
  }

  return {
    actions: {
      createCobranzaContactCache,
      editCobranzaContactCache,
      deleteCobranzaContactCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default companyContactsCache
