import { useLoloContext } from '@/contexts/LoloProvider'
import { ClientType } from '@/types/extrajudicial/client.type'
import { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { KEY_COBRANZA_URL_COBRANZA_CODE_CACHE } from '../ExtrajudicialCobranzaComments/CobranzaCommentsTable/utils/company-comentarios.cache'
import { getClientByCode } from '@/services/extrajudicial/client.service'
import notification from '@/ui/notification'
import Container from '@/ui/Container'
import CobranzaFilesInfo from './CobranzaFilesInfo'
import CobranzaFilesTable from './CobranzaFilesTable'

const ExtrajudicialCobranzaFiles = () => {
  const { code } = useParams()

  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const { data } = useQuery<AxiosResponse<ClientType, Error>>(
    [`${KEY_COBRANZA_URL_COBRANZA_CODE_CACHE}_GET_CLIENT_BY_CODE`, `${code ?? ''}-${idCHB}`],
    async () => {
      return await getClientByCode(code ?? '', idCHB)
    },
    {
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const clientName = data?.data.name
  const clientId = data?.data.id
  const clientCustomerHasBankId = data?.data.customerHasBankId

  return (
    <Container
      width="100%"
      height="calc(100% - 50px)"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <CobranzaFilesInfo name={clientName} clientId={clientId} />
      <CobranzaFilesTable
        clientId={clientId}
        clientCode={Number(code)}
        clientCustomerHasBankId={clientCustomerHasBankId}
      />
    </Container>
  )
}

export default ExtrajudicialCobranzaFiles
