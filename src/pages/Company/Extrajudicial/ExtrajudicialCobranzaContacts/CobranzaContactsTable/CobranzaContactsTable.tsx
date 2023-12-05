import useModal from '@/hooks/useModal'
import { ExtContactType } from '@/types/extrajudicial/ext-contact.type'
import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { KEY_COBRANZA_URL_CONTACT_CODE_CACHE } from './utils/company-contacts.cache'
import notification from '@/ui/notification'
import { getExtContactsByClientID } from '@/services/extrajudicial/ext-contact.service'
import Container from '@/ui/Container'
import Table from '@/ui/Table'
import BodyCell from '@/ui/Table/BodyCell'
import Button from '@/ui/Button'
import Text from '@/ui/Text'
import moment from 'moment'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import { contactsColumns } from './utils/columns'
import DeleteCobranzaContactsModal from '../Modals/DeleteCobranzaContactsModal'
import CobranzaContactsModal from '../Modals/CobranzaContactsModal'

type CobranzaContactsTableProps = {
  clientId?: number
}

const CobranzaContactsTable = ({ clientId }: CobranzaContactsTableProps) => {
  const [idEdit, setIdEdit] = useState<number>(0)
  const [idDeletedContact, setIdDeletedContact] = useState<number>(0)

  const { visible: visibleModalContact, showModal: showModalContact, hideModal: hideModalContact } = useModal()
  const { visible: visibleDeleteContact, showModal: showDeleteContact, hideModal: hideDeleteContact } = useModal()

  const handleClickEdit = (id: number) => {
    setIdEdit(id)
    showModalContact()
  }

  const onCloseModalEdit = () => {
    setIdEdit(0)
    hideModalContact()
  }

  const handleClickDelete = (id: number) => {
    setIdDeletedContact(id)
    showDeleteContact()
  }

  const onCloseModalDelete = () => {
    setIdDeletedContact(0)
    hideDeleteContact()
  }

  const { data, isLoading } = useQuery<AxiosResponse<Array<ExtContactType>, Error>>(
    [KEY_COBRANZA_URL_CONTACT_CODE_CACHE, clientId],
    async () => {
      return await getExtContactsByClientID(clientId ?? 0)
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

  const contacts = data?.data ?? []

  return (
    <Container width="100%" height="calc(100% - 80px)" padding="20px">
      <Table
        top="180px"
        columns={contactsColumns}
        loading={isLoading}
        isArrayEmpty={!contacts.length}
        emptyState={
          <EmptyStateCell colSpan={contactsColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!contacts?.length &&
          contacts.map((record: ExtContactType, key) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{key + 1 || ''}</BodyCell>
                <BodyCell textAlign="left">
                  <Text.Body size="m" weight="regular">
                    {record.name || ''}
                  </Text.Body>
                </BodyCell>
                <BodyCell textAlign="center">
                  <Text.Body size="m" weight="bold" color="Primary5">
                    {record.phone || ''}
                  </Text.Body>
                </BodyCell>
                <BodyCell textAlign="center">
                  <Text.Body size="m" weight="bold" color="Primary5">
                    {record.email || ''}
                  </Text.Body>
                </BodyCell>
                <BodyCell textAlign="center">{moment(record.createdAt).format('DD-MM-YYYY') || ''}</BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Container display="flex" gap="10px" justifyContent="space-around">
                      <Button
                        onClick={(event) => {
                          event.stopPropagation()
                          handleClickEdit(record.id)
                        }}
                        messageTooltip="Editar contacto"
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                        permission="P02-02-07-02"
                      />
                      <Button
                        onClick={() => {
                          handleClickDelete(record.id)
                        }}
                        messageTooltip="Eliminar contacto"
                        shape="round"
                        size="small"
                        leadingIcon="ri-delete-bin-line"
                        permission="P02-02-07-03"
                        display="danger"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      <CobranzaContactsModal
        visible={visibleModalContact}
        onClose={onCloseModalEdit}
        idContact={idEdit}
        clientId={clientId}
        isEdit
      />

      <DeleteCobranzaContactsModal
        visible={visibleDeleteContact}
        onClose={onCloseModalDelete}
        idContact={idDeletedContact}
        clientId={clientId}
      />
    </Container>
  )
}

export default CobranzaContactsTable
