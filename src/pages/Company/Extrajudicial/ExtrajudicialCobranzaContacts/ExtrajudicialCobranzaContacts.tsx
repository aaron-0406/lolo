import { useLoloContext } from '@/contexts/LoloProvider'
import notification from '@/ui/notification'
import { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import Container from '@/ui/Container'
import CobranzaContactsTable from './CobranzaContactsTable'
import CobranzaContactsInfo from './CobranzaContactsInfo'
import { KEY_COBRANZA_URL_COBRANZA_CODE_CACHE } from '../ExtrajudicialCobranzaComments/CobranzaCommentsTable/utils/company-comentarios.cache'
import { ClientType } from '@/types/extrajudicial/client.type'
import { getClientByCode } from '@/services/extrajudicial/client.service'

const ExtrajudicialCobranzaContacts = () => {
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
    <Container width="100%" height="100%" display="flex" flexDirection="column" justifyContent="space-between">
      <CobranzaContactsInfo name={clientName} clientId={clientId} />
      <CobranzaContactsTable clientId={clientId} />
    </Container>
  )
}

export default ExtrajudicialCobranzaContacts
