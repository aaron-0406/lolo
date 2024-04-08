import useModal from '@/hooks/useModal'
import { DirectionType } from '@/types/extrajudicial/direction.type'
import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { KEY_COBRANZA_URL_ADDRESSES_CODE_CACHE } from './utils/company-addresses.cache'
import { getDirectionsByClientID } from '@/services/extrajudicial/direction.service'
import notification from '@/ui/notification'
import Container from '@/ui/Container'
import Table from '@/ui/Table'
import { addressesColumns } from './utils/columns'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import Text from '@/ui/Text'
import Button from '@/ui/Button'
import DeleteCobranzaAddressesModal from '../Modals/DeleteCobranzaAddressesModal'
import CobranzaAddressesModal from '../Modals/CobranzaAddressesModal'
import moment from 'moment'

type CobranzaAddressesTableProps = {
  clientId?: number
}

const CobranzaAddressesTable = ({ clientId }: CobranzaAddressesTableProps) => {
  const [idEdit, setIdEdit] = useState<number>(0)
  const [idDeletedAddress, setIdDeletedAddress] = useState<number>(0)

  const { visible: visibleModalAddress, showModal: showModalAddress, hideModal: hideModalAddress } = useModal()
  const { visible: visibleDeleteAddress, showModal: showDeleteAddress, hideModal: hideDeleteAddress } = useModal()

  const handleClickEdit = (id: number) => {
    setIdEdit(id)
    showModalAddress()
  }

  const onCloseModalEdit = () => {
    setIdEdit(0)
    hideModalAddress()
  }

  const handleClickDelete = (id: number) => {
    setIdDeletedAddress(id)
    showDeleteAddress()
  }

  const onCloseModalDelete = () => {
    setIdDeletedAddress(0)
    hideDeleteAddress()
  }

  const { data, isLoading } = useQuery<AxiosResponse<Array<DirectionType & { addressType: { type: string } }>, Error>>(
    [KEY_COBRANZA_URL_ADDRESSES_CODE_CACHE, clientId],
    async () => {
      return await getDirectionsByClientID(clientId ?? 0)
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

  const addresses = data?.data ?? []

  return (
    <Container width="100%" height="calc(100% - 80px)" padding="20px">
      <Table
        top="180px"
        columns={addressesColumns}
        loading={isLoading}
        isArrayEmpty={!addresses.length}
        emptyState={
          <EmptyStateCell colSpan={addressesColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!addresses?.length &&
          addresses.map(
            (
              record: DirectionType & {
                addressType: {
                  type: string
                }
              },
              key
            ) => {
              return (
                <tr className="styled-data-table-row" key={record.id}>
                  <BodyCell textAlign="center">{key + 1 || ''}</BodyCell>
                  <BodyCell textAlign="center">
                    <Text.Body size="m" weight="bold" color="Primary5">
                      {record?.addressType?.type || '-'}
                    </Text.Body>
                  </BodyCell>
                  <BodyCell textAlign="left">
                    <Container width="40vw" whiteSpace="nowrap" overFlowX="hidden" textOverflow="ellipsis">
                      <Text.Body size="m" weight="regular">
                        {record.direction || ''}
                      </Text.Body>
                    </Container>
                  </BodyCell>
                  <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
                  <BodyCell textAlign="center">
                    {
                      <Container display="flex" gap="10px" justifyContent="space-around">
                        <Button
                          onClick={(event) => {
                            event.stopPropagation()
                            handleClickEdit(record.id)
                          }}
                          messageTooltip="Editar dirección"
                          shape="round"
                          size="small"
                          leadingIcon="ri-pencil-fill"
                          permission="P02-02-05-02"
                        />
                        <Button
                          onClick={() => {
                            handleClickDelete(record.id)
                          }}
                          messageTooltip="Eliminar dirección"
                          shape="round"
                          size="small"
                          leadingIcon="ri-delete-bin-line"
                          permission="P02-02-05-03"
                          display="danger"
                        />
                      </Container>
                    }
                  </BodyCell>
                </tr>
              )
            }
          )}
      </Table>

      <CobranzaAddressesModal
        visible={visibleModalAddress}
        onClose={onCloseModalEdit}
        idAddress={idEdit}
        clientId={clientId}
        isEdit
      />
      <DeleteCobranzaAddressesModal
        visible={visibleDeleteAddress}
        onClose={onCloseModalDelete}
        idAddress={idDeletedAddress}
        clientId={clientId}
      />
    </Container>
  )
}

export default CobranzaAddressesTable
