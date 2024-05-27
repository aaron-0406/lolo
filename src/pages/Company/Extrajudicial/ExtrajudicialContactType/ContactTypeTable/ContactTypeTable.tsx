import { useState } from 'react'
import moment from 'moment'
import { useQuery } from 'react-query'
import { ExtContactTypeType } from '@/types/extrajudicial/ext-contact-type.type'
import useModal from '@/hooks/useModal'
import { getContactTypeByCHB } from '@/services/extrajudicial/ext-contact-type.service'
import Container from '@/ui/Container'
import Table from '@/ui/Table'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import Button from '@/ui/Button'
import ContactTypeModal from '../Modals/ContactTypeModal'
import DeleteContactTypeModal from '../Modals/DeleteContactTypeModal'
import { ContactTypeColumns } from './utils/columns'
import { KEY_EXT_CONTACT_TYPE_CACHE } from './utils/ext-contact-type.cache'
import { useLoloContext } from '@/contexts/LoloProvider'
import { AxiosResponse } from 'axios'
import notification from '@/ui/notification'
import EmptyState from '@/ui/EmptyState'

const ContactTypeTable = () => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const [idContactType, setIdContactType] = useState<number>(0)
  const [idDeletedContactType, setIdDeletedContactType] = useState<number>(0)

  const {
    visible: visibleModalContactType,
    showModal: showModalContactType,
    hideModal: hideModalContactType,
  } = useModal()
  const {
    visible: visibleDeleteContactType,
    showModal: showDeleteContactType,
    hideModal: hideDeleteContactType,
  } = useModal()

  const handleClickButtonEdit = (id: number) => {
    setIdContactType(id)
    showModalContactType()
  }

  const handleClickDeleteContactType = (id: number) => {
    setIdDeletedContactType(id)
    showDeleteContactType()
  }

  const onCloseDeleteContactType = () => {
    setIdDeletedContactType(0)
    hideDeleteContactType()
  }

  const onCloseModal = () => {
    setIdContactType(0)
    hideModalContactType()
  }

  const { isLoading, data } = useQuery<AxiosResponse<Array<ExtContactTypeType>, Error>>(
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

  const contactsType = data?.data ?? []

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Table
        top="200px"
        columns={ContactTypeColumns}
        loading={isLoading}
        isArrayEmpty={!contactsType.length}
        emptyState={
          <EmptyStateCell colSpan={ContactTypeColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No se encontró el tipo de contacto, por favor seleccione otros filtros."
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={ContactTypeColumns.length}>
            <EmptyState
              title="No hay recursos disponibles"
              description="No hay tipos de contactos disponibles en este momento"
            />
          </EmptyStateCell>
        }
      >
        {!!contactsType?.length &&
          contactsType.map((record: ExtContactTypeType, key: number) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${key + 1 || ''}`}</BodyCell>
                <BodyCell textAlign="left">{`${record.contactType || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Container display="flex" gap="10px" justifyContent="space-around">
                      <Button
                        onClick={() => {
                          handleClickButtonEdit(record.id)
                        }}
                        messageTooltip="Editar tipo de contacto"
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                        permission="P18-02"
                      />
                      <Button
                        onClick={() => {
                          handleClickDeleteContactType(record.id)
                        }}
                        messageTooltip="Eliminar tipo de contacto"
                        shape="round"
                        size="small"
                        leadingIcon="ri-delete-bin-line"
                        permission="P18-03"
                        display="danger"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      <ContactTypeModal visible={visibleModalContactType} onClose={onCloseModal} idContactType={idContactType} isEdit />
      <DeleteContactTypeModal
        visible={visibleDeleteContactType}
        onClose={onCloseDeleteContactType}
        idContactType={idDeletedContactType}
      />
    </Container>
  )
}

export default ContactTypeTable
