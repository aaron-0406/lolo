import { useState, useEffect } from 'react'
import moment from 'moment'
import { FormProvider, useForm } from 'react-hook-form'
import { ModalUsersResolver } from './ModalCustomers.yup'
import { useQuery } from 'react-query'
import { usersColumns } from './utils/columns'
import { getAllUsersByID } from '../../../../../shared/services/customer-user.service'
import { CustomerUserType } from '../../../../../shared/types/customer-user.type'
import Container from '../../../../../ui/Container'
import Modal from '../../../../../ui/Modal'
import Button from '../../../../../ui/Button'
import TextField from '../../../../../ui/fields/TextField'
import Table from '../../../../../ui/Tables/Table'
import BodyCell from '../../../../../ui/Tables/Table/BodyCell'
import EmptyStateCell from '../../../../../ui/Tables/Table/EmptyStateCell'

type CustomersModalProps = {
  visible: boolean
  onClose: () => void
  id: number
}

const defaultValuesCustomer: Omit<CustomerUserType, 'createdAt'> = {
  id: 0,
  name: '',
  lastName: '',
  phone: '',
  dni: '',
  email: '',
  privilege: '',
  state: true,
  customerId: 0,
}

const UsersModal = ({ visible, onClose, id }: CustomersModalProps) => {
  const formMethods = useForm<CustomerUserType>({
    resolver: ModalUsersResolver,
    mode: 'all',
    defaultValues: defaultValuesCustomer,
  })

  const [load, setLoad] = useState(false)
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('')

  const handleClickCloseModal = () => {
    onClose()
  }

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const { refetch } = useQuery(
    'get-all-user-by-id',
    async () => {
      return await getAllUsersByID(id)
    },
    {
      onSuccess: ({ data }) => {
        if (filter !== '') {
          data = data.filter((filt: CustomerUserType) => {
            return filt.name.substring(0, filter.length).toUpperCase() === filter.toUpperCase()
          })
        }
        setUsers(data)
        setLoad(false)
      },
    }
  )

  useEffect(() => {
    refetch()
  }, [refetch, load, filter, id])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-files"
        title="Usuarios"
        contentOverflowY="auto"
      >
        <Container width="100%" padding="20px" display="flex" flexDirection="column">
          <Container display="flex" justifyContent="space-between">
            <TextField onChange={onChangeSearch} width="calc(100% - 60px)" placeholder="Buscar usuario:" />
            <Button shape="round" leadingIcon="ri-add-fill" size="small" />
          </Container>
          <Container margin="10px 0 0 0">
            <Table
              top="260px"
              columns={usersColumns}
              loading={load}
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
                      <BodyCell>{`${record.lastName || ''}`}</BodyCell>
                      <BodyCell>{`${record.phone || ''}`}</BodyCell>
                      <BodyCell>{`${record.dni || ''}`}</BodyCell>
                      <BodyCell>{`${record.email || ''}`}</BodyCell>
                      <BodyCell>{`${record.privilege || ''}`}</BodyCell>
                      <BodyCell textAlign="center">{`${record.state ? 'activo' : 'inactivo'}`}</BodyCell>
                      <BodyCell textAlign="center">{`${moment(record.createdAt).format('DD-MM-YYYY') || ''}`}</BodyCell>
                    </tr>
                  )
                })}
            </Table>
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default UsersModal
