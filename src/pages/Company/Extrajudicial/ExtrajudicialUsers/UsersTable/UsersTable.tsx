import { Dispatch, FC, useEffect, useState } from 'react'
import moment from 'moment'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAllUsersByID, editUserState } from '@/services/dash/customer-user.service'
import { CustomerUserType } from '@/types/dash/customer-user.type'
import Container from '@/ui/Container'
import Pagination from '@/ui/Pagination'
import { Opts } from '@/ui/Pagination/interfaces'
import Table from '@/ui/Table'
import { usersColumns } from './utils/columns'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import BodyCell from '@/ui/Table/BodyCell'
import Button from '@/ui/Button'
import UsersModal from '../Modals/UsersModal'
import useModal from '@/hooks/useModal'
import DeleteUsersModal from '../Modals/DeleteUsersModal'
import extUsuariosCache, { KEY_EXT_USUARIOS_CACHE } from './utils/ext-usuarios.cache'
import notification from '@/ui/notification'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'

type UsersTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
}

const UsersTable: FC<UsersTableProps> = ({ opts, setOpts }) => {
  const {
    client: {
      customer: { id: customerId },
    },
  } = useLoloContext()

  const queryClient = useQueryClient()
  const {
    actions: { editUserCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = extUsuariosCache(queryClient)

  const [users, setUsers] = useState([])
  const [usersCount, setUsersCount] = useState<number>(0)
  const [idUser, setIdUser] = useState(0)
  const [idDeletedUser, setIdDeletedUser] = useState(0)

  const { visible: visibleModalUser, showModal: showModalUser, hideModal: hideModalUser } = useModal()
  const { visible: visibleDeleteUser, showModal: showDeleteUser, hideModal: hideDeleteUser } = useModal()

  const handleClickEditUser = (id: number) => {
    setIdUser(id)
    showModalUser()
  }

  const handleClickDeleteUser = (id: number) => {
    setIdDeletedUser(id)
    showDeleteUser()
  }

  const handleClickButtonState = (state: boolean, idUser: number) => {
    editStateUser({ idUser, state })
  }

  const onCloseDeleteUser = () => {
    setIdDeletedUser(0)
    hideDeleteUser()
  }
  const onCloseUser = () => {
    setIdUser(0)
    hideModalUser()
  }

  const { mutate: editStateUser } = useMutation<
    AxiosResponse<CustomerUserType>,
    AxiosError<CustomErrorResponse>,
    { idUser: number; state: boolean }
  >(
    async ({ idUser, state }) => {
      return await editUserState(idUser, !state)
    },
    {
      onSuccess: (result, { state }) => {
        state
          ? notification({ type: 'success', message: 'Usuario habilitado' })
          : notification({ type: 'success', message: 'Usuario inhabilitado' })

        editUserCache(result.data)
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

  const { isLoading, refetch } = useQuery(
    KEY_EXT_USUARIOS_CACHE,
    async () => {
      return await getAllUsersByID(customerId)
    },
    {
      onSuccess: ({ data }) => {
        if (opts.filter !== '') {
          data = data.filter((filt: CustomerUserType) => {
            return filt.name.substring(0, opts.filter.length).toUpperCase() === opts.filter.toUpperCase()
          })
        }
        setUsers(data)
        setUsersCount(data.length)
      },
    }
  )

  useEffect(() => {
    refetch()
    // eslint-disable-next-line
  }, [])

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={usersCount} opts={opts} setOpts={setOpts} />
      <Table
        top="260px"
        columns={usersColumns}
        loading={isLoading}
        isArrayEmpty={!users.length}
        emptyState={
          <EmptyStateCell colSpan={usersColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!users?.length &&
          users.map((record: CustomerUserType) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${record.id || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.name || ''}`}</BodyCell>
                <BodyCell>{`${record.lastName || ''}`}</BodyCell>
                <BodyCell>{`${record.phone || ''}`}</BodyCell>
                <BodyCell>{`${record.dni || ''}`}</BodyCell>
                <BodyCell>{`${record.email || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.role?.name || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.state ? 'activo' : 'inactivo'}`}</BodyCell>
                <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  <Container justifyContent="space-around" gap="15px" display="flex">
                    {
                      <Button
                        onClick={() => {
                          handleClickEditUser(record.id)
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
                          handleClickDeleteUser(record.id)
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

      <UsersModal visible={visibleModalUser} onClose={onCloseUser} idUser={idUser} isEdit />

      <DeleteUsersModal visible={visibleDeleteUser} onClose={onCloseDeleteUser} idUser={idDeletedUser} />
    </Container>
  )
}

export default UsersTable
