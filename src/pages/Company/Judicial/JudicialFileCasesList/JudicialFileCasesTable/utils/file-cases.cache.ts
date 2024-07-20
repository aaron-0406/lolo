import { CustomerUserType } from '@/types/dash/customer-user.type'
import { ClientType } from '@/types/extrajudicial/client.type'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import { JudicialCourtType } from '@/types/judicial/judicial-court.type'
import { JudicialProceduralWayType } from '@/types/judicial/judicial-procedural-way.type'
import { JudicialSedeType } from '@/types/judicial/judicial-sede.type'
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
} & {
  client: ClientType
} & {
  judicialSede: JudicialSedeType
} & {
  impulseStatus: number 
}

type QueryDataType = AxiosResponse<{ caseFiles: JudicialFileCaseTableRow[]; quantity: number }> | undefined

const judicialFileCaseCache = (queryClient: QueryClient) => {
  const createFileCaseCache = (data: JudicialFileCaseTableRow) => {
    queryClient.setQueryData<QueryDataType>([KEY_FILE_CASE_CACHE, data.customerHasBankId], (old) => {
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
    queryClient.setQueryData<QueryDataType>([KEY_FILE_CASE_CACHE, data.customerHasBankId], (old) => {
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

  const deleteFileCaseCache = (id: string, chb: number) => {
    queryClient.setQueryData<QueryDataType>([KEY_FILE_CASE_CACHE, chb], (old) => {
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

  const onRefetchQueryCache = async (chb: number) => {
    await queryClient.refetchQueries([KEY_FILE_CASE_CACHE, chb])
  }

  const onMutateCache = async (chb: number) => {
    const old = queryClient.getQueryData([KEY_FILE_CASE_CACHE, chb])
    if (!old) {
      await queryClient.prefetchQuery([KEY_FILE_CASE_CACHE, chb])
    }

    return { old }
  }

  const onSettledCache = (chb: number) => {
    queryClient.cancelQueries([KEY_FILE_CASE_CACHE, chb])
  }

  const onErrorCache = (context: { old: QueryDataType }, chb: number) => {
    queryClient.setQueryData([KEY_FILE_CASE_CACHE, chb], context.old)
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
