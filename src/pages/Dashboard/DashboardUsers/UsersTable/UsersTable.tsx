import { Dispatch, FC, useState, useEffect } from 'react'
import moment from 'moment'
import { useQuery } from 'react-query'
import { getCustomerAll } from '../../../../shared/services/customer.service'
import { CustomerUserType } from '../../../../shared/types/customer-user.type'
import Container from '../../../../ui/Container'
import Pagination from '../../../../ui/Pagination'
import { Opts } from '../../../../ui/Pagination/interfaces'
import Table from '../../../../ui/Tables/Table'
import { usersColumns } from './utils/columns'
import EmptyStateCell from '../../../../ui/Tables/Table/EmptyStateCell'
import BodyCell from '../../../../ui/Tables/Table/BodyCell'
import Button from '../../../../ui/Button'
import useModal from '../../../../shared/hooks/useModal'
import UsersModal from '../Modals/UsersModal/UsersModal'

type UsersTableProps = {
  opts: Opts
  setOpts: Dispatch<Opts>
  loading: boolean
  setLoadingGlobal: (state: boolean) => void
}

const UsersTable: FC<UsersTableProps> = ({ opts, setOpts, loading, setLoadingGlobal }) => {
  const [users, setUsers] = useState([])
  const [usersCount, setUsersCount] = useState<number>(0)
  const [idUser, setIdUser] = useState(0)

  const { visible: visibleModalCustomer, showModal: showModalCustomer, hideModal: hideModalCustomer } = useModal()
  const { visible: visibleModalUser, showModal: showModalUser, hideModal: hideModalUser } = useModal()

  const handleClickButtonUser = (id: number) => {
    setIdUser(id)
    showModalUser()
  }

  const onCloseUser = () => {
    setIdUser(0)
    hideModalUser()
  }

  const { refetch } = useQuery(
    'get-customer-all',
    async () => {
      return await getCustomerAll()
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
                <BodyCell textAlign="center">{`${record.name || ''}`}</BodyCell>
                <BodyCell>{`${record.lastname || ''}`}</BodyCell>
                <BodyCell>{`${record.cellphone || ''}`}</BodyCell>
                <BodyCell>{`${record.dni || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.state ? 'activo' : 'inactivo'}`}</BodyCell>
                <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Button
                      onClick={() => {
                        handleClickButtonClient(record.urlIdentifier)
                      }}
                      shape="round"
                      size="small"
                      leadingIcon="ri-pencil-fill"
                    />
                  }
                </BodyCell>
                <BodyCell textAlign="center">
                  {
                    <Button
                      onClick={() => {
                        handleClickButtonUser(record.id)
                      }}
                      shape="round"
                      size="small"
                      leadingIcon="ri-user-search-fill"
                    />
                  }
                </BodyCell>
              </tr>
            )
          })}
      </Table>

      <CustomerModal
        visible={visibleModalCustomer}
        onClose={onCloseModal}
        setLoadingGlobal={setLoadingGlobal}
        url={urlEdit}
        isEdit
      />
      <UsersModal visible={visibleModalUser} onClose={onCloseUser} id={idCustomer} />
    </Container>
  )
}

export default UsersTable
