import Container from '@/ui/Container'
import FileCasesRelatedProcessActions from './FileCaseRelatedProcessesListActions'
import JudicialFileCasesTable from './FileCaseRelatedProcessesTable'

import { AxiosResponse } from 'axios'
import notification from '@/ui/notification'
import { getFileCaseByNumberFile } from '@/services/judicial/judicial-file-case.service'

import { useLoloContext } from '@/contexts/LoloProvider'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

const JudicialFileCaseRelatedProcessList = () => {
  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const codeParams = useParams().code ?? ''
  const { data } = useQuery<AxiosResponse<any, Error>>(
    ['get-file-case-by-code', codeParams ?? ''],
    async () => {
      return await getFileCaseByNumberFile(codeParams ?? '', Number(idCHB))
    },
    {
      onError: (error: any) => {
        notification({
          type: 'info',
          message: error.response.data.message,
        })
      },
    }
  )

  const clientName = data?.data.client.name
  const caseFileId = data?.data.id
  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column">
      <FileCasesRelatedProcessActions clientName={clientName} />
      <JudicialFileCasesTable caseFileId={caseFileId} />
    </Container>
  )
}

export default JudicialFileCaseRelatedProcessList
