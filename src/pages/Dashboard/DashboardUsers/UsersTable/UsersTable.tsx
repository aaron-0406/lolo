import { Dispatch, FC, useState, useEffect } from 'react'
import moment from 'moment'
import { useQuery } from 'react-query'
import { getAllUsersByID } from '../../../../shared/services/customer-user.service'
import { CustomerUserType } from '../../../../shared/types/customer-user.type'
import Container from '../../../../ui/Container'
import Pagination from '../../../../ui/Pagination'
import { Opts } from '../../../../ui/Pagination/interfaces'
import Table from '../../../../ui/Tables/Table'
import { usersColumns } from './utils/columns'
import EmptyStateCell from '../../../../ui/Tables/Table/EmptyStateCell'
import BodyCell from '../../../../ui/Tables/Table/BodyCell'
import Button from '../../../../ui/Button'
import { useDashContext } from '../../../../shared/contexts/DashProvider'
import UsersModal from '../Modals/UsersModal'
import useModal from '../../../../shared/hooks/useModal'
import DeleteUsersModal from '../Modals/DeleteUsersModal'

type UsersTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
  loading: boolean
  setLoadingGlobal: (state: boolean) => void
}

const UsersTable: FC<UsersTableProps> = ({ opts, setOpts, loading, setLoadingGlobal }) => {
  const {
    dashCustomer: {
      selectedCustomer: { id: customerId },
    },
  } = useDashContext()

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

  const onCloseDeleteUser = () => {
    setIdDeletedUser(0)
    hideDeleteUser()
  }
  const onCloseUser = () => {
    setIdUser(0)
    setLoadingGlobal(false)
    hideModalUser()
  }

  const { refetch } = useQuery(
    'get-all-users-by-id',
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
        setLoadingGlobal(false)
      },
      enabled: false,
    }
  )

  useEffect(() => {
    if (loading) refetch()
  }, [refetch, loading, opts])

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Pagination count={usersCount} opts={opts} setOpts={setOpts} />
      <Table
        top="260px"
        columns={usersColumns}
        loading={loading}
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
                <BodyCell textAlign="center">{`${record.privilege || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.state ? 'activo' : 'inactivo'}`}</BodyCell>
                <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  <Container justifyContent="space-between" display="flex">
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

      <UsersModal
        visible={visibleModalUser}
        onClose={onCloseUser}
        setLoadingGlobal={setLoadingGlobal}
        idUser={idUser}
        isEdit
      />

      <DeleteUsersModal
        visible={visibleDeleteUser}
        onClose={onCloseDeleteUser}
        setLoadingGlobal={setLoadingGlobal}
        idUser={idDeletedUser}
      />
    </Container>
  )
}

export default UsersTable
