import Container from '../../../../../ui/Container/Container'
import Text from '../../../../../ui/Text'
import { useQuery } from 'react-query'
import { getClientByCode } from '../../../../../shared/services/extrajudicial/client.service'
import { useLoloContext } from '../../../../../shared/contexts/LoloProvider'
import { ClientType } from '../../../../../shared/types/extrajudicial/client.type'
import Button from '../../../../../ui/Button/Button'
import useModal from '../../../../../shared/hooks/useModal'
import CobranzaCommentsModal from '../Modals/CobranzaCommentsModal/CobranzaCommentsModal'
import { useParams } from 'react-router-dom'
import { KEY_COBRANZA_URL_COBRANZA_CODE_CACHE } from '../CobranzaCommentsTable/utils/company-comentarios.cache'
import { AxiosResponse } from 'axios'
import notification from '../../../../../ui/notification'

const CobranzaCommentsInfo = () => {
  const { code } = useParams()

  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const onShowModal = () => {
    showModalAdd()
  }
  const onCloseModal = () => {
    hideModalAdd()
  }

  const { data } = useQuery<AxiosResponse<ClientType, Error>>(
    [`${KEY_COBRANZA_URL_COBRANZA_CODE_CACHE}_CLIENT_BY_CODE`, `${code}-${idCHB}`],
    async () => {
      return getClientByCode(String(code ?? ''), idCHB)
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

  return (
    <Container
      width="100%"
      display="flex"
      flexDirection="row"
      gap="20px"
      justifyContent="space-between"
      padding="0 20px"
    >
      <Container display="flex" flexDirection="row" gap="20px" alignItems="center">
        <Text.Body size="l" weight="bold" ellipsis>
          {code}
        </Text.Body>
        <Text.Body size="l" weight="bold" ellipsis>
          /
        </Text.Body>
        <Text.Body size="l" weight="regular" color="Primary5" ellipsis>
          {data?.data.name ?? '-'}
        </Text.Body>
      </Container>

      <Container>
        <Button onClick={onShowModal} width="100px" shape="round" trailingIcon="ri-add-fill" />
        <CobranzaCommentsModal visible={visibleModalAdd} onClose={onCloseModal} />
      </Container>
    </Container>
  )
}

export default CobranzaCommentsInfo
