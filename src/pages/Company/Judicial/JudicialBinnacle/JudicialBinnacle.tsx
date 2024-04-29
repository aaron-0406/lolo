import Container from '@/ui/Container'
import JudicialBinnacleTable from './JudicialBinnacleTable'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { getFileCaseByNumberFile } from '@/services/judicial/judicial-file-case.service'
import notification from '@/ui/notification'
import JudicialBinnacleInfo from './JudicialBinnacleInfo'
import { useLoloContext } from '@/contexts/LoloProvider'

const JudicialBinnacle = () => {
  const codeParams = useParams().code ?? ''
  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()
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

  const judicialFileCaseId = data?.data.id
  const clientCode = data?.data.client.code

  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column" justifyContent="space-between">
      <JudicialBinnacleInfo judicialFileCaseId={judicialFileCaseId} clientCode={clientCode} />
      <JudicialBinnacleTable judicialFileCaseId={judicialFileCaseId} clientCode={clientCode} />
    </Container>
  )
}

export default JudicialBinnacle
