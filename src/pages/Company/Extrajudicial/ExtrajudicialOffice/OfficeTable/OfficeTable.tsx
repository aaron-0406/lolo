import { useState } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import moment from 'moment'
import { ExtOfficeType } from '@/types/extrajudicial/ext-office.type'
import { CityType } from '@/types/dash/city.type'
import { getAllOffices, editStateOffice } from '@/services/extrajudicial/ext-office.service'
import { officeColumns } from './utils/columns'
import Container from '@/ui/Container'
import Table from '@/ui/Table'
import BodyCell from '@/ui/Table/BodyCell'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import Button from '@/ui/Button'
import notification from '@/ui/notification'
import { CustomErrorResponse } from 'types/customErrorResponse'
import useModal from '@/hooks/useModal'
import dashOfficeCache, { KEY_EXT_OFFICE_CACHE } from './utils/ext-office.cache'
// import IpAddressBankModal from '../Modals/IpAddressBankModal'
// import DeleteIpAddressBankModal from '../Modals/DeleteIpAddressBankModal'
import { useLoloContext } from '@/contexts/LoloProvider'

const OfficeTable = () => {
  const queryClient = useQueryClient()
  const {
    actions: { editOfficeCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = dashOfficeCache(queryClient)

  const {
    client: { customer },
  } = useLoloContext()

  const [idOffice, setIdOffice] = useState<number>(0)
  const [idDeletedOffice, setIdDeletedOffice] = useState<number>(0)

  const { visible: visibleModalOffice, showModal: showModalOffice, hideModal: hideModalOffice } = useModal()
  const { visible: visibleDeleteOffice, showModal: showDeleteOffice, hideModal: hideDeleteOffice} = useModal()

  const handleClickButtonState = (state: boolean, id: number) => {
    editStateOfficeMutate({ id, state })
  }

  const handleClickEditOffice = (id: number) => {
    setIdOffice(id)
    showModalOffice()
  }

  const onCloseOffice = () => {
    setIdOffice(0)
    hideModalOffice()
  }

  const handleClickDeleteOffice = (id: number) => {
    setIdDeletedOffice(id)
    showDeleteOffice()
  }

  const onCloseDeleteOffice = () => {
    setIdDeletedOffice(0)
    hideDeleteOffice()
  }

  const { isLoading, data } = useQuery<AxiosResponse<Array<ExtOfficeType& {city: CityType}>, Error>>(
    KEY_EXT_OFFICE_CACHE,
    async () => {
      return await getAllOffices(customer.id)
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

  const offices = data?.data ?? []

  const { mutate: editStateOfficeMutate } = useMutation<
    AxiosResponse<ExtOfficeType>,
    AxiosError<CustomErrorResponse>,
    { id: number; state: boolean }
  >(
    async ({ id, state }) => {
      return await editStateOffice(id, customer.id, !state)
    },
    {
      onSuccess: (result, { state }) => {
        !state
          ? notification({ type: 'success', message: 'Oficina habilitada' })
          : notification({ type: 'success', message: 'Oficina inhabilitada' })

        editOfficeCache(result.data)
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

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Table
        top="260px"
        columns={officeColumns}
        loading={isLoading}
        isArrayEmpty={!offices.length}
        emptyState={
          <EmptyStateCell colSpan={officeColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!offices?.length &&
          offices.map((record: ExtOfficeType & {city: CityType}, index) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${index + 1 || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.name || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.address || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.cityId || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.state ? 'Habilitado' : 'Inhabilitado'}`}</BodyCell>
                <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  <Container justifyContent="space-around" gap="15px" display="flex">
                    {
                      <Button
                        onClick={() => {
                          handleClickEditOffice(record.id)
                        }}
                        messageTooltip="Editar oficina"
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
                      messageTooltip={record.state ? 'Inhabilitar oficina' : 'Habilitar oficina'}
                      shape="round"
                      size="small"
                      leadingIcon={record.state ? 'ri-shield-user-fill' : 'ri-shield-user-line'}
                      permission="P15-02"
                    />
                    {
                      <Button
                        onClick={() => {
                          handleClickDeleteOffice(record.id)
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

      {/* <IpAddressBankModal visible={visibleModalIpAddress} onClose={onCloseIpAddress} idIpAddress={idIpAddress} isEdit />

      <DeleteIpAddressBankModal
        visible={visibleDeleteIpAddress}
        onClose={onCloseDeleteIpAddress}
        idIpAddress={idDeletedIpAddress}
      /> */}
    </Container>
  )
}

export default OfficeTable
