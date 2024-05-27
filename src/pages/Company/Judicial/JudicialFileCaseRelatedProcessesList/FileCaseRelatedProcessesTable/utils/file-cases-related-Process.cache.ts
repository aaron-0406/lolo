import { CustomerUserType } from '@/types/dash/customer-user.type'
import { ClientType } from '@/types/extrajudicial/client.type'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import { JudicialCourtType } from '@/types/judicial/judicial-court.type'
import { JudicialProceduralWayType } from '@/types/judicial/judicial-procedural-way.type'
import { JudicialSedeType } from '@/types/judicial/judicial-sede.type'
import { JudicialSubjectType } from '@/types/judicial/judicial-subject.type'
import { AxiosResponse } from 'axios'
import { QueryClient } from 'react-query'

export const KEY_FILE_CASE_RELATED_PROCESS_CACHE =
  'key-get-all-file-cases-related-process-by-case-file-related-process-id'

export type JudicialFileCaseTableRow = JudicialCaseFileType & {
  customerUser: CustomerUserType
} & {
  judicialCourt: JudicialCourtType
} & {
  judicialProceduralWay: JudicialProceduralWayType
} & {
  judicialSubject: JudicialSubjectType
} & {
  judicialSede: JudicialSedeType
} & {
  client: ClientType
}

type QueryDataType = AxiosResponse<{ caseFiles: JudicialFileCaseTableRow[]; quantity: number }> | undefined

const judicialFileCaseRelatedProcessCache = (queryClient: QueryClient) => {
  const createFileCaseRelatedProcessCache = (data: JudicialFileCaseTableRow) => {
    queryClient.setQueryData<QueryDataType>(
      [KEY_FILE_CASE_RELATED_PROCESS_CACHE, data.idJudicialCaseFileRelated],
      (old) => {
        if (old) {
          return {
            ...old,
            data: {
              caseFiles: [...old.data.caseFiles, data],
              quantity: old.data.quantity + 1,
            },
          }
        }
      }
    )
  }

  const editFileCaseRelatedProcessCache = (data: JudicialFileCaseTableRow) => {
    queryClient.setQueryData<QueryDataType>(
      [KEY_FILE_CASE_RELATED_PROCESS_CACHE, data.idJudicialCaseFileRelated],
      (old) => {
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
      }
    )
  }

  const deleteFileCaseRelatedProcessCache = (id: string, relatedCaseFileId: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_FILE_CASE_RELATED_PROCESS_CACHE, relatedCaseFileId], (old) => {
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

  const onRefetchQueryCache = async (relatedCaseFileId: number) => {
    await queryClient.refetchQueries([KEY_FILE_CASE_RELATED_PROCESS_CACHE, relatedCaseFileId])
  }

  const onMutateCache = async (relatedCaseFileId: number) => {
    const old = queryClient.getQueryData([KEY_FILE_CASE_RELATED_PROCESS_CACHE, relatedCaseFileId])
    if (!old) {
      await queryClient.prefetchQuery([KEY_FILE_CASE_RELATED_PROCESS_CACHE, relatedCaseFileId])
    }

    return { old }
  }

  const onSettledCache = (relatedCaseFileId: number) => {
    queryClient.cancelQueries([KEY_FILE_CASE_RELATED_PROCESS_CACHE, relatedCaseFileId])
  }

  const onErrorCache = (context: { old: QueryDataType }, relatedCaseFileId: number) => {
    queryClient.setQueryData([KEY_FILE_CASE_RELATED_PROCESS_CACHE, relatedCaseFileId], context.old)
  }

  return {
    actions: {
      createFileCaseRelatedProcessCache,
      editFileCaseRelatedProcessCache,
      deleteFileCaseRelatedProcessCache,
    },
    onRefetchQueryCache,
    onMutateCache,
    onSettledCache,
    onErrorCache,
  }
}

export default judicialFileCaseRelatedProcessCache
