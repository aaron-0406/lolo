import { useEffect } from 'react'
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
import { AxiosError, AxiosResponse } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import notification from '@/ui/notification'
import dashIpAddressBankCache from './utils/dash-ip-address-bank.cache'

const IpAddressBankTable = () => {
  const queryClient = useQueryClient()
  const {
    actions: { editIpAddressBankCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = dashIpAddressBankCache(queryClient)

  const handleClickButtonState = (state: boolean, id: number) => {
    editStateIp({ id, state })
  }

  const { isLoading, refetch, data } = useQuery('get-all-ip-address', async () => {
    return await getAllIpAddress()
  })

  const ipAddress = data?.data ?? []

  const { mutate: editStateIp } = useMutation<
    AxiosResponse<ExtIpAddressBankType>,
    AxiosError<CustomErrorResponse>,
    { id: number; state: boolean }
  >(
    async ({ id, state }) => {
      return await editStateIpAddress(id, !state)
    },
    {
      onSuccess: (result, { state }) => {
        state
          ? notification({ type: 'success', message: 'IP habilitada' })
          : notification({ type: 'success', message: 'IP inhabilitada' })

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
          ipAddress.map((record: ExtIpAddressBankType) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${record.id || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.addressName || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.ip || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.state ? 'activo' : 'inactivo'}`}</BodyCell>
                <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  <Container justifyContent="space-around" gap="15px" display="flex">
                    {
                      <Button
                        onClick={() => {
                          //   handleClickEditUser(record.id)
                        }}
                        shape="round"
                        size="small"
                        leadingIcon="ri-pencil-fill"
                      />
                    }
                    <Button
                      onClick={() => {
                        handleClickButtonState(record.state, record.id)
                      }}
                      display={record.state ? 'default' : 'warning'}
                      messageTooltip={record.state ? 'Inhabilitar' : 'Habilitar'}
                      shape="round"
                      size="small"
                      leadingIcon={record.state ? 'ri-shield-user-fill' : 'ri-shield-user-line'}
                    />
                    {
                      <Button
                        onClick={() => {
                          //   handleClickDeleteUser(record.id)
                        }}
                        shape="round"
                        size="small"
                        leadingIcon="ri-user-unfollow-fill"
                      />
                    }
                  </Container>
                </BodyCell>
              </tr>
            )
          })}
      </Table>
    </Container>
  )
}

export default IpAddressBankTable
