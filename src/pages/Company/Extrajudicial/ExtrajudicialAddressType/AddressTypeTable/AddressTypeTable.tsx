import { useState } from 'react'
import moment from 'moment'
import { useQuery } from 'react-query'
import { ExtAddressType } from '@/types/extrajudicial/ext-address-type.type'
import useModal from '@/hooks/useModal'
import { getAddressesTypeByCHB } from '@/services/extrajudicial/ext-address-type.service'
import Container from '@/ui/Container'
import Table from '@/ui/Table'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import Button from '@/ui/Button'
import AddressTypeModal from '../Modals/AddressTypeModal'
import DeleteAddressTypeModal from '../Modals/DeleteAddressTypeModal'
import { AddressTypeColumns } from './utils/columns'
import { KEY_EXT_ADDRESS_TYPE_CACHE } from './utils/ext-address-type.cache'
import { useLoloContext } from '@/contexts/LoloProvider'

const AddressesTypeTable = () => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const [idAddress, setIdAddress] = useState<number>(0)
  const [idDeletedAddress, setIdDeletedAddress] = useState<number>(0)

  const {
    visible: visibleModalAddressType,
    showModal: showModalAddressType,
    hideModal: hideModalAddressType,
  } = useModal()
  const {
    visible: visibleDeleteAddressType,
    showModal: showDeleteAddressType,
    hideModal: hideDeleteAddressType,
  } = useModal()

  const handleClickButtonEdit = (id: number) => {
    setIdAddress(id)
    showModalAddressType()
  }

  const handleClickDeleteAddress = (id: number) => {
    setIdDeletedAddress(id)
    showDeleteAddressType()
  }

  const onCloseDeleteAddress = () => {
    setIdDeletedAddress(0)
    hideDeleteAddressType()
  }

  const onCloseModal = () => {
    setIdAddress(0)
    hideModalAddressType()
  }

  const { isLoading, data } = useQuery([KEY_EXT_ADDRESS_TYPE_CACHE, parseInt(chb.length ? chb : '0')], async () => {
    return await getAddressesTypeByCHB(parseInt(chb.length ? chb : '0'))
  })

  const addressesType = data?.data ?? []

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Table
        top="260px"
        columns={AddressTypeColumns}
        loading={isLoading}
        isArrayEmpty={!addressesType.length}
        emptyState={
          <EmptyStateCell colSpan={AddressTypeColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!addressesType?.length &&
          addressesType.map((record: ExtAddressType, key: number) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${key + 1 || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.type || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Container display="flex" gap="10px" justifyContent="space-around">
                      <Button
                        onClick={() => {
                          handleClickButtonEdit(record.id)
                        }}
                        messageTooltip="Editar tipo de dirección"
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                        permission="P16-02"
                      />
                      <Button
                        onClick={() => {
                          handleClickDeleteAddress(record.id)
                        }}
                        messageTooltip="Eliminar tipo de dirección"
                        shape="round"
                        size="small"
                        leadingIcon="ri-delete-bin-line"
                        permission="P16-03"
                        display="danger"
                      />
                    </Container>
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      <AddressTypeModal visible={visibleModalAddressType} onClose={onCloseModal} idAddressType={idAddress} isEdit />
      <DeleteAddressTypeModal
        visible={visibleDeleteAddressType}
        onClose={onCloseDeleteAddress}
        idAddressType={idDeletedAddress}
      />
    </Container>
  )
}

export default AddressesTypeTable
