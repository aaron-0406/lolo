import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import moment from 'moment'
import useModal from '@/hooks/useModal'
import companyContactsCache, { KEY_COBRANZA_URL_CONTACT_CODE_CACHE } from './utils/company-contacts.cache'
import { getExtContactsByClientID, editContactState } from '@/services/extrajudicial/ext-contact.service'
import { getContactTypeByCHB } from '@/services/extrajudicial/ext-contact-type.service'
import { ExtContactType } from '@/types/extrajudicial/ext-contact.type'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { ExtContactTypeType } from '@/types/extrajudicial/ext-contact-type.type'
import Container from '@/ui/Container'
import notification from '@/ui/notification'
import Table from '@/ui/Table'
import BodyCell from '@/ui/Table/BodyCell'
import Button from '@/ui/Button'
import Text from '@/ui/Text'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import { contactsColumns } from './utils/columns'
import DeleteCobranzaContactsModal from '../Modals/DeleteCobranzaContactsModal'
import CobranzaContactsModal from '../Modals/CobranzaContactsModal'
import { useLoloContext } from '@/contexts/LoloProvider'
import { KEY_EXT_CONTACT_TYPE_CACHE } from '@/pages/extrajudicial/ExtrajudicialContactType/ContactTypeTable/utils/ext-contact-type.cache'
import styled, { css } from 'styled-components'

type CobranzaContactsTableProps = {
  clientId?: number
}

const CobranzaContactsTable = ({ clientId = 0 }: CobranzaContactsTableProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const queryClient = useQueryClient()
  const {
    actions: { editCobranzaContactCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = companyContactsCache(queryClient)

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

  const handleClickButtonState = (state: boolean, idContact: number) => {
    editStateContact({ idContact, state })
  }

  const { mutate: editStateContact } = useMutation<
    AxiosResponse<ExtContactType>,
    AxiosError<CustomErrorResponse>,
    { idContact: number; state: boolean }
  >(
    async ({ idContact, state }) => {
      return await editContactState(idContact, !state)
    },
    {
      onSuccess: (result, { state }) => {
        state
          ? notification({ type: 'success', message: 'Contacto no establecido' })
          : notification({ type: 'success', message: 'Contacto establecido' })

        editCobranzaContactCache(result.data)
      },
      onMutate: () => {
        return onMutateCache(clientId)
      },
      onSettled: () => {
        onSettledCache(clientId)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, clientId)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { data, isLoading } = useQuery<
    AxiosResponse<Array<ExtContactType & { extContactType: ExtContactTypeType }>, Error>
  >(
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
    <Container width="100%" height="calc(100% - 80px)" padding="20px">
      <Table
        top="195px"
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
          contacts.map((record: ExtContactType & { extContactType: ExtContactTypeType }, key) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{key + 1 || ''}</BodyCell>
                <BodyCell textAlign="center">
                  {<StyledButtonState $display={record.state} shape="round" size="small" />}
                </BodyCell>
                <BodyCell textAlign="left">
                  <Text.Body size="m" weight="regular">
                    {record?.dni || '-'}
                  </Text.Body>
                </BodyCell>
                <BodyCell textAlign="left">
                  <Text.Body size="m" weight="regular">
                    {record.name || '-'}
                  </Text.Body>
                </BodyCell>
                <BodyCell textAlign="center">
                  <Text.Body size="m" weight="bold" color="Primary5">
                    {record.phone || '-'}
                  </Text.Body>
                </BodyCell>
                <BodyCell textAlign="center">
                  <Text.Body size="m" weight="bold" color="Primary5">
                    {record.email || '-'}
                  </Text.Body>
                </BodyCell>
                <BodyCell textAlign="center">
                  <Text.Body size="m" weight="bold" color="Primary5">
                    {record?.extContactType?.contactType || '-'}
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
                          handleClickButtonState(record.state, record.id)
                        }}
                        display={record.state ? 'default' : 'warning'}
                        messageTooltip="Establecer contacto"
                        shape="round"
                        size="small"
                        leadingIcon="ri-customer-service-2-fill"
                        permission="P02-02-07-04"
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
        contactsType={contactsType}
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

const StyledButtonState = styled(Button)<{ $display?: boolean }>`
  ${({ theme, $display }) =>
    !$display &&
    css`
      background-color: ${theme.colors.Danger5};
      border: ${theme.colors.Danger5};
    `}

  ${({ theme, $display }) =>
    $display &&
    css`
      background-color: ${theme.colors.Success5};
      border: ${theme.colors.Success5};
    `}
`
