import { useEffect, useState } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import moment from 'moment'
import { ExtIpAddressBankType } from '@/types/extrajudicial/ext-ip-address-bank.type'
import { getAllIpAddress, editStateIpAddress } from '@/services/extrajudicial/ext-ip-address-bank.service'
import { ipAddressBankColumns } from './utils/columns'
import Container from '@/ui/Container'
import Table from '@/ui/Table'
import BodyCell from '@/ui/Table/BodyCell'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import Button from '@/ui/Button'
import { CustomErrorResponse } from 'types/customErrorResponse'
import notification from '@/ui/notification'
import useModal from '@/hooks/useModal'
import dashIpAddressBankCache, { KEY_EXT_IP_ADDRESS_BANK_CACHE } from './utils/dash-ip-address-bank.cache'
import IpAddressBankModal from '../Modals/IpAddressBankModal'
import DeleteIpAddressBankModal from '../Modals/DeleteIpAddressBankModal'
import { useLoloContext } from '@/contexts/LoloProvider'

const IpAddressBankTable = () => {
  const queryClient = useQueryClient()
  const {
    actions: { editIpAddressBankCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = dashIpAddressBankCache(queryClient)

  const {
    client: { customer },
  } = useLoloContext()

  const [idIpAddress, setIdIpAddress] = useState<number>(0)
  const [idDeletedIpAddress, setIdDeletedIpAddress] = useState<number>(0)

  const { visible: visibleModalIpAddress, showModal: showModalIpAddress, hideModal: hideModalIpAddress } = useModal()
  const { visible: visibleDeleteIpAddress, showModal: showDeleteIpAddress, hideModal: hideDeleteIpAddress } = useModal()

  const handleClickButtonState = (state: boolean, id: number) => {
    editStateIp({ id, state })
  }

  const handleClickEditIpAddress = (id: number) => {
    setIdIpAddress(id)
    showModalIpAddress()
  }

  const onCloseIpAddress = () => {
    setIdIpAddress(0)
    hideModalIpAddress()
  }

  const handleClickDeleteIpAddress = (id: number) => {
    setIdDeletedIpAddress(id)
    showDeleteIpAddress()
  }

  const onCloseDeleteIpAddress = () => {
    setIdDeletedIpAddress(0)
    hideDeleteIpAddress()
  }

  const { isLoading, refetch, data } = useQuery<AxiosResponse<Array<ExtIpAddressBankType>, Error>>(
    KEY_EXT_IP_ADDRESS_BANK_CACHE,
    async () => {
      return await getAllIpAddress(customer.id)
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

  const ipAddress = data?.data ?? []

  const { mutate: editStateIp } = useMutation<
    AxiosResponse<ExtIpAddressBankType>,
    AxiosError<CustomErrorResponse>,
    { id: number; state: boolean }
  >(
    async ({ id, state }) => {
      return await editStateIpAddress(id, customer.id, !state)
    },
    {
      onSuccess: (result, { state }) => {
        !state
          ? notification({ type: 'success', message: 'Dirección IP habilitada' })
          : notification({ type: 'success', message: 'Dirección IP inhabilitada' })

        editIpAddressBankCache(result.data)
      },
      onMutate: () => {
        return onMutateCache()
      },
      onSettled: () => {
        onSettledCache()
      },
      onError: (error, _, context: any) => {
        onErrorCache(context)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  useEffect(() => {
    refetch()
    // eslint-disable-next-line
  }, [])

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Table
        top="260px"
        columns={ipAddressBankColumns}
        loading={isLoading}
        isArrayEmpty={!ipAddress.length}
        emptyState={
          <EmptyStateCell colSpan={ipAddressBankColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!ipAddress?.length &&
          ipAddress.map((record: ExtIpAddressBankType, index) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${index + 1 || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.addressName || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.ip || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.state ? 'activo' : 'inactivo'}`}</BodyCell>
                <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  <Container justifyContent="space-around" gap="15px" display="flex">
                    {
                      <Button
                        onClick={() => {
                          handleClickEditIpAddress(record.id)
                        }}
                        messageTooltip="Editar dirección IP"
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                        permission="P15-03"
                      />
                    }
                    <Button
                      onClick={() => {
                        handleClickButtonState(record.state, record.id)
                      }}
                      display={record.state ? 'default' : 'warning'}
                      messageTooltip={record.state ? 'Inhabilitar dirección IP' : 'Habilitar dirección IP'}
                      shape="round"
                      size="small"
                      leadingIcon={record.state ? 'ri-shield-user-fill' : 'ri-shield-user-line'}
                      permission="P15-02"
                    />
                    {
                      <Button
                        onClick={() => {
                          handleClickDeleteIpAddress(record.id)
                        }}
                        messageTooltip="Eliminar dirección IP"
                        shape="round"
                        size="small"
                        leadingIcon="ri-delete-bin-line"
                        display="danger"
                        permission="P15-04"
                      />
                    }
                  </Container>
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      <IpAddressBankModal visible={visibleModalIpAddress} onClose={onCloseIpAddress} idIpAddress={idIpAddress} isEdit />

      <DeleteIpAddressBankModal
        visible={visibleDeleteIpAddress}
        onClose={onCloseDeleteIpAddress}
        idIpAddress={idDeletedIpAddress}
      />
    </Container>
  )
}

export default IpAddressBankTable
