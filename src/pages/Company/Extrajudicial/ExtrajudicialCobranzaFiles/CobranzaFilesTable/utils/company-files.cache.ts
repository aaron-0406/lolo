import { QueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import { FileType } from '@/types/extrajudicial/file.type'

export const KEY_COBRANZA_URL_FILES_CODE_CACHE = 'key-cobranza-url-files-code-cache'

type QueryDataType = AxiosResponse<FileType[]> | undefined

const companyFilesCache = (queryClient: QueryClient) => {
  const createCobranzaFilesCache = (data: FileType[], clientId: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_COBRANZA_URL_FILES_CODE_CACHE, clientId], (old) => {
      if (old) {
        return { ...old, data: [...old.data, ...data] }
      }
    })
  }

  const editCobranzaFilesCache = (data: FileType) => {
    queryClient.setQueryData<QueryDataType>([KEY_COBRANZA_URL_FILES_CODE_CACHE, data.clientId], (old) => {
      if (old) {
        const dataUpdated = old.data.map((file: FileType) => {
          if (file.id === data.id) {
            return data
          }

          return file
        })

        return { ...old, data: dataUpdated }
      }
    })
  }

  const deleteCobranzaFilesCache = (fileId: number, clientId: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_COBRANZA_URL_FILES_CODE_CACHE, clientId], (old) => {
      if (old) {
        const dataUpdated = old.data.filter((file: FileType) => file.id !== fileId)
        return { ...old, data: dataUpdated }
      }
    })
  }

  const onRefetchQueryCache = async (clientId: number) => {
    await queryClient.refetchQueries([KEY_COBRANZA_URL_FILES_CODE_CACHE, clientId])
  }

  const onMutateCache = async (clientId: number) => {
    const old = queryClient.getQueryData([KEY_COBRANZA_URL_FILES_CODE_CACHE, clientId])
    if (!old) {
      await queryClient.prefetchQuery([KEY_COBRANZA_URL_FILES_CODE_CACHE, clientId])
    }

    return { old }
  }

  const onSettledCache = (clientId: number) => {
    queryClient.cancelQueries([KEY_COBRANZA_URL_FILES_CODE_CACHE, clientId])
  }

  const onErrorCache = (context: { old: QueryDataType }, clientId: number) => {
    queryClient.setQueryData([KEY_COBRANZA_URL_FILES_CODE_CACHE, clientId], context.old)
  }

  return {
    actions: {
      createCobranzaFilesCache,
      editCobranzaFilesCache,
      deleteCobranzaFilesCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default companyFilesCache
