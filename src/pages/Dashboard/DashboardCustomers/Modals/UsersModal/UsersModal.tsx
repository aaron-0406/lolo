import { useState, useEffect } from 'react'
import moment from 'moment'
import { useQuery } from 'react-query'
import { usersColumns } from './utils/columns'
import { getAllUsersByID } from '../../../../../shared/services/customer-user.service'
import { CustomerUserType } from '../../../../../shared/types/customer-user.type'
import { device } from '../../../../../shared/breakpoints/reponsive'
import { useMediaQuery } from '../../../../../shared/hooks/useMediaQuery'
import Container from '../../../../../ui/Container'
import Modal from '../../../../../ui/Modal'
import TextField from '../../../../../ui/fields/TextField'
import Table from '../../../../../ui/Tables/Table'
import BodyCell from '../../../../../ui/Tables/Table/BodyCell'
import EmptyStateCell from '../../../../../ui/Tables/Table/EmptyStateCell'
import Label from '../../../../../ui/Label'

type CustomersModalProps = {
  visible: boolean
  onClose: () => void
  id: number
}

const UsersModal = ({ visible, onClose, id }: CustomersModalProps) => {
  const greaterThanMobile = useMediaQuery(device.tabletS)

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
    <Modal visible={visible} onClose={handleClickCloseModal} id="modal-files" title="Usuarios" contentOverflowY="auto">
      <Container width="100%" padding="20px" display="flex" flexDirection="column" gap="20px">
        <Container display="flex" justifyContent="space-between" gap="10px">
          <Container display={greaterThanMobile ? 'flex' : 'none'}>
            <Label label="Buscar:" />
          </Container>
          <TextField onChange={onChangeSearch} width="100%" placeholder="Buscar usuario por nombre:" />
        </Container>
        <Container>
          <Table
            top="340px"
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
  )
}

export default UsersModal
