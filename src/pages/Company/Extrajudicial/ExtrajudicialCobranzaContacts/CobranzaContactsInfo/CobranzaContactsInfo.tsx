import { useQuery } from 'react-query'
import { useLoloContext } from '@/contexts/LoloProvider'
import useModal from '@/hooks/useModal'
import { getContactTypeByCHB } from '@/services/extrajudicial/ext-contact-type.service'
import { ExtContactTypeType } from '@/types/extrajudicial/ext-contact-type.type'
import Breadcrumbs from '@/ui/Breadcrumbs'
import { LinkType } from '@/ui/Breadcrumbs/Breadcrumbs.type'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import { useParams } from 'react-router-dom'
import paths from 'shared/routes/paths'
import CobranzaContactsModal from '../Modals/CobranzaContactsModal'
import { KEY_EXT_CONTACT_TYPE_CACHE } from '../../ExtrajudicialContactType/ContactTypeTable/utils/ext-contact-type.cache'
import Text from '@/ui/Text'
import notification from '@/ui/notification'

type CobranzaContactsInfoProps = {
  name?: string
  clientId?: number
}

const CobranzaContactsInfo = ({ name, clientId }: CobranzaContactsInfoProps) => {
  const code = useParams().code ?? ''

  const {
    client: { customer },
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const { visible: visibleModalAdd, showModal: showModalAdd, hideModal: hideModalAdd } = useModal()

  const onShowModal = () => {
    showModalAdd()
  }
  const onCloseModal = () => {
    hideModalAdd()
  }

  const routers: LinkType[] = [
    {
      link: paths.cobranza.clientes(customer.urlIdentifier),
      name: 'Clientes',
    },
    {
      link: paths.cobranza.cobranza(customer.urlIdentifier, code),
      name: code,
    },
    {
      link: paths.cobranza.cobranzaContacts(customer.urlIdentifier, code),
      name: 'Contactos',
    },
  ]

  const { data: contactsTypeData } = useQuery(
    [KEY_EXT_CONTACT_TYPE_CACHE, parseInt(chb.length ? chb : '0')],
    async () => {
      return await getContactTypeByCHB(parseInt(chb.length ? chb : '0'))
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

  const contactsType: ExtContactTypeType[] = contactsTypeData?.data ?? []

  return (
    <Container
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="20px 20px 0 20px"
    >
      <Container display="flex" flexDirection="column" gap="15px">
        <Breadcrumbs routes={routers} />
        <Container padding="0 20px 0 20px" backgroundColor="#e5e7eb">
          <Text.Body size="m" weight="bold">
            {name}
          </Text.Body>
        </Container>
      </Container>

      <Container>
        <Button
          onClick={onShowModal}
          disabled={!name}
          width="100px"
          shape="round"
          trailingIcon="ri-add-fill"
          permission="P02-02-07-01"
          messageTooltip="Agregar contacto"
        />

        {clientId && (
          <CobranzaContactsModal
            contactsType={contactsType}
            visible={visibleModalAdd}
            onClose={onCloseModal}
            clientId={clientId}
          />
        )}
      </Container>
    </Container>
  )
}

export default CobranzaContactsInfo
