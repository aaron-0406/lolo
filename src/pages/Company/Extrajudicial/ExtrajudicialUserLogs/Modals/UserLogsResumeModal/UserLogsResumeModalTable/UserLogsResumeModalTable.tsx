import Table from '@/ui/Table'
import React from 'react'
import { userLogsResumeModalColumns } from './utils/columns'
import { Change } from '../UserLogsResumeModal'
import BodyCell from '@/ui/Table/BodyCell'
import Container from '@/ui/Container'
import EmptyState from '@/ui/EmptyState'

type UserLogsResumeModalTableProps = {
  changes: Change[]
}

const UserLogsResumeModalTable = ({ changes }: UserLogsResumeModalTableProps) => {
  return (
    <Container width="100%" height="calc(100% - 112px)" padding="10px 0px 0px 0px">
      <Table
        columns={userLogsResumeModalColumns}
        isArrayEmpty={!changes.length}
        emptyState={<EmptyState title="No hay cambios" description="No hay cambios para mostrar" />}
      >
        {changes.map((change, index) => (
          <tr key={index}>
            <BodyCell>{change.key ?? '-'}</BodyCell>
            <BodyCell textAlign="center">
              {Array.isArray(change.oldValue)
                ? showArrayChanges(change.oldValue)
                : JSON.stringify(change.oldValue) ?? '-'}
            </BodyCell>
            <BodyCell textAlign="center">
              {Array.isArray(change.newValue)
                ? showArrayChanges(change.newValue)
                : JSON.stringify(change.newValue) ?? '-'}
            </BodyCell>
            <BodyCell textAlign="center">
              {Array.isArray(change.withoutChanges)
                ? showArrayChanges(change.withoutChanges)
                : JSON.stringify(change.withoutChanges) ?? '-'}
            </BodyCell>
          </tr>
        ))}
      </Table>
    </Container>
  )
}

export default UserLogsResumeModalTable

const showArrayChanges = (data: any[]) => {
  return (
    <Container width="100%" display="flex" flexDirection="column" padding="10px 0px 0px 0px">
      {data.map((change, index) => (
        <Container key={index} width="100%" display="flex" justifyContent="start">
          {JSON.stringify(change) ?? '-'}
        </Container>
      ))}
    </Container>
  )
}
