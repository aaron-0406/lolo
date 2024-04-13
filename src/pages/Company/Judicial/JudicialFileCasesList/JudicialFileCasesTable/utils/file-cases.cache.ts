import { CustomerUserType } from '@/types/dash/customer-user.type'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import { JudicialCourtType } from '@/types/judicial/judicial-court.type'
import { JudicialProceduralWayType } from '@/types/judicial/judicial-procedural-way.type'
import { JudicialSubjectType } from '@/types/judicial/judicial-subject.type'
import { AxiosResponse } from 'axios'
import { QueryClient } from 'react-query'

export const KEY_FILE_CASE_CACHE = 'key-get-all-file-cases-by-chb'

export type JudicialFileCaseTableRow = JudicialCaseFileType & {
  customerUser: CustomerUserType
} & {
  judicialCourt: JudicialCourtType
} & {
  judicialProceduralWay: JudicialProceduralWayType
} & {
  judicialSubject: JudicialSubjectType
}

type QueryDataType = AxiosResponse<{ caseFiles: JudicialFileCaseTableRow[]; quantity: number }> | undefined

const judicialFileCaseCache = (queryClient: QueryClient) => {
  const createFileCaseCache = (data: JudicialFileCaseTableRow) => {
    queryClient.setQueryData<QueryDataType>(KEY_FILE_CASE_CACHE, (old) => {
      if (old) {
        return {
          ...old,
          data: {
            caseFiles: [...old.data.caseFiles, data],
            quantity: old.data.quantity + 1,
          },
        }
      }
    })
  }

  const editFileCaseCache = (data: JudicialFileCaseTableRow) => {
    queryClient.setQueryData<QueryDataType>(KEY_FILE_CASE_CACHE, (old) => {
      if (old) {
        const dataUpdated = old.data.caseFiles.map((fileCase: JudicialFileCaseTableRow) => {
          if (fileCase.id === data.id) return data
          return fileCase
        })

        return {
          ...old,
          data: {
            caseFiles: dataUpdated,
            quantity: old.data.quantity,
          },
        }
      }
    })
  }

  const deleteFileCaseCache = (id: string) => {
    queryClient.setQueryData<QueryDataType>(KEY_FILE_CASE_CACHE, (old) => {
      if (old) {
        const dataUpdated = old.data.caseFiles.filter(
          (fileCase: JudicialFileCaseTableRow) => fileCase.id !== parseInt(id)
        )
        return {
          ...old,
          data: {
            caseFiles: dataUpdated,
            quantity: old.data.quantity - 1,
          },
        }
      }
    })
  }

  const onRefetchQueryCache = async () => {
    await queryClient.refetchQueries(KEY_FILE_CASE_CACHE)
  }

  const onMutateCache = async () => {
    const old = queryClient.getQueryData(KEY_FILE_CASE_CACHE)
    if (!old) {
      await queryClient.prefetchQuery(KEY_FILE_CASE_CACHE)
    }

    return { old }
  }

  const onSettledCache = () => {
    queryClient.cancelQueries(KEY_FILE_CASE_CACHE)
  }

  const onErrorCache = (context: { old: QueryDataType }) => {
    queryClient.setQueryData(KEY_FILE_CASE_CACHE, context.old)
  }

  return {
    actions: {
      createFileCaseCache,
      editFileCaseCache,
      deleteFileCaseCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default judicialFileCaseCache
