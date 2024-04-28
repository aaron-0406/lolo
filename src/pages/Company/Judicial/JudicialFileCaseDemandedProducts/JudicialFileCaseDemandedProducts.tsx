import Container from '@/ui/Container'
import FileCaseDemandedProductsInfo from './FileCaseDemandedProductsInfo'
import FileCaseDemandedProductsTable from './FileCaseDemandedProductsTable'
import { useParams } from 'react-router-dom'
import { useLoloContext } from '@/contexts/LoloProvider'
import { AxiosError, AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import { getFileCaseByNumberFile } from '@/services/judicial/judicial-file-case.service'
import notification from '@/ui/notification'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'

const JudicialFileCaseDemandedProducts = () => {
  const { code } = useParams()

  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const chb = idCHB.length ? parseInt(idCHB) : 0

  const { data } = useQuery<
    AxiosResponse<JudicialCaseFileType & { client: { id: number; name: string } }>,
    AxiosError<CustomErrorResponse>
  >(
    ['case'],
    async () => {
      return await getFileCaseByNumberFile(code ?? '', chb)
    },
    {
      onError: (error) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const caseFileId = data?.data?.id ?? 0
  const clientName = data?.data?.client?.name
  const clientId = data?.data?.client?.id

  return (
    <Container width="100%" height="100%" display="flex" flexDirection="column" justifyContent="space-between">
      <FileCaseDemandedProductsInfo clientId={clientId} clientName={clientName} caseFileId={caseFileId} />
      <FileCaseDemandedProductsTable caseFileId={caseFileId} />
    </Container>
  )
}

export default JudicialFileCaseDemandedProducts
