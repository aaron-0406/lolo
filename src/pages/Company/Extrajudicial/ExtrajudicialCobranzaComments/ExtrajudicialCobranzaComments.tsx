import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import CobranzaCommentsInfo from './CobranzaCommentsInfo/CobranzaCommentsInfo'
import Container from '@/ui/Container/Container'
import CobranzaCommentsTable from './CobranzaCommentsTable/CobranzaCommentsTable'
import { useParams } from 'react-router-dom'
import { useLoloContext } from '@/contexts/LoloProvider'
import { ClientType } from '@/types/extrajudicial/client.type'
import { KEY_COBRANZA_URL_COBRANZA_CODE_CACHE } from './CobranzaCommentsTable/utils/company-comentarios.cache'
import { getClientByCode } from '@/services/extrajudicial/client.service'
import notification from '@/ui/notification'

const ExtrajudicialCobranzaComments = () => {
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

  return (
    <Container
      width="100%"
      height="calc(100% - 50px)"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <CobranzaCommentsInfo name={clientName} clientId={clientId} />
      <CobranzaCommentsTable clientId={clientId} />
    </Container>
  )
}

export default ExtrajudicialCobranzaComments
