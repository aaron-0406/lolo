import { Dispatch, FC, useEffect, useState } from 'react'
import moment from 'moment'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAllUsersByID, editUserState, removeCode2faUser } from '@/services/dash/customer-user.service'
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
import EmptyState from '@/ui/EmptyState'

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

  const handleClickRemoveCode2fa = (idUser: number) => {
    removeCode2fa({ idUser })
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

  const { mutate: removeCode2fa } = useMutation<
    AxiosResponse<CustomerUserType>,
    AxiosError<CustomErrorResponse>,
    { idUser: number }
  >(
    async ({ idUser }) => {
      return await removeCode2faUser(idUser)
    },
    {
      onSuccess: (result) => {
        notification({ type: 'success', message: 'Código de autenticación eliminado' })
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
        top="220px"
        columns={usersColumns}
        loading={isLoading}
        isArrayEmpty={!users.length}
        emptyState={
          <EmptyStateCell colSpan={usersColumns.length}>
            <EmptyState
              title="Recurso no encontrado"
              description="No se encontraron los datos solicitados. Por favor, intente con otros filtros."
            />
          </EmptyStateCell>
        }
        emptyFirstState={
          <EmptyStateCell colSpan={usersColumns.length}>
            <EmptyState title="Recurso no encontrado" description="No se encontraron los datos solicitados." />
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
                  <Container justifyContent="start" gap="15px" display="flex">
                    <Button
                      onClick={() => {
                        handleClickEditUser(record.id)
                      }}
                      shape="round"
                      messageTooltip="Editar usuario"
                      size="small"
                      leadingIcon="ri-pencil-fill"
                      permission="P10-02"
                    />
                    <Button
                      onClick={() => {
                        handleClickButtonState(record.state, record.id)
                      }}
                      display={record.state ? 'default' : 'warning'}
                      messageTooltip={record.state ? 'Inhabilitar' : 'Habilitar'}
                      shape="round"
                      size="small"
                      leadingIcon={record.state ? 'ri-shield-user-fill' : 'ri-shield-user-line'}
                      permission="P10-04"
                    />
                    <Button
                      onClick={() => {
                        handleClickDeleteUser(record.id)
                      }}
                      shape="round"
                      size="small"
                      messageTooltip="Eliminar usuario"
                      leadingIcon="ri-delete-bin-line"
                      permission="P10-03"
                      display="danger"
                    />
                    {record.code2fa ? (
                      <Button
                        messageTooltip={'Remover 2fa'}
                        onClick={() => {
                          handleClickRemoveCode2fa(record.id)
                        }}
                        shape="round"
                        size="small"
                        leadingIcon="ri-qr-code-line"
                        permission="P10-05"
                        display="danger"
                      />
                    ) : null}
                  </Container>
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      {visibleModalUser ? <UsersModal visible={visibleModalUser} onClose={onCloseUser} idUser={idUser} isEdit /> : null}
      {visibleDeleteUser ? (
        <DeleteUsersModal visible={visibleDeleteUser} onClose={onCloseDeleteUser} idUser={idDeletedUser} />
      ) : null}
    </Container>
  )
}

export default UsersTable
