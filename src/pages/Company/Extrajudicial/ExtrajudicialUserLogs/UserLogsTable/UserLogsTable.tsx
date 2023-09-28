import { useLoloContext } from '@/contexts/LoloProvider'
import { getAllUserLogsByCustomerId } from '@/services/dash/user-log.service'
import { UserLogType } from '@/types/dash/user-log.type'
import Container from '@/ui/Container'
import Table from '@/ui/Table'
import BodyCell from '@/ui/Table/BodyCell'
import EmptyStateCell from '@/ui/Table/EmptyStateCell'
import { useQuery } from 'react-query'
import { userLogsColumns } from './utils/columns'
import moment from 'moment'
import { CustomerUserType } from '@/types/dash/customer-user.type'

const UserLogsTable = () => {
  const {
    client: {
      customer: { id: customerId },
    },
    customerUser: {
      user: { permissions },
    },
  } = useLoloContext()

  const getPermission = (code: string) => {
    return permissions?.find((permission) => permission.code === code)
  }

  const { isLoading, data } = useQuery(['key-ext-user-logs-cache', customerId], async () => {
    return await getAllUserLogsByCustomerId(customerId)
  })

  let userLogs = data?.data ?? []

  return (
    <Container width="100%" height="calc(100% - 112px)" padding="20px">
      <Table
        top="260px"
        columns={userLogsColumns}
        loading={isLoading}
        isArrayEmpty={!userLogs.length}
        emptyState={
          <EmptyStateCell colSpan={userLogsColumns.length}>
            <div>Vacio</div>
          </EmptyStateCell>
        }
      >
        {!!userLogs?.length &&
          userLogs.map((record: UserLogType & { customerUser: CustomerUserType }, key: number) => {
            return (
              <tr className="styled-data-table-row" key={record.id}>
                <BodyCell textAlign="center">{`${key + 1 || ''}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.codeAction || '-'}`}</BodyCell>
                <BodyCell textAlign="center">{`${getPermission(record.codeAction)?.name || '-'}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.entity || '-'}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.entityId || '-'}`}</BodyCell>
                <BodyCell textAlign="center">{`${record.customerUser.name || '-'} ${
                  record.customerUser.lastName || '-'
                }`}</BodyCell>
                <BodyCell textAlign="center">{moment(record.createAt).format('DD-MM-YYYY') || ''}</BodyCell>
                <BodyCell textAlign="center">{moment(record.createAt).format('HH:mm:ss') || ''}</BodyCell>
                <BodyCell textAlign="center">{`${record.ip || '-'}`}</BodyCell>
              </tr>
            )
          })}
      </Table>
    </Container>
  )
}

export default UserLogsTable
