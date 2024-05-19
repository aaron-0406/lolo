import { CustomerUserType } from '@/types/dash/customer-user.type'
import { usersColumns } from '../ScheduledNoticationsUsersTable/utils/columns'
import { Dispatch, useEffect, useState } from 'react';

import { Opts } from '@/ui/Pagination/interfaces'
import BodyCell from '@/ui/Table/BodyCell'
import Pagination from '@/ui/Pagination'
import Container from '@/ui/Container'
import Table from '@/ui/Table'
import Checkbox from '@/ui/Checkbox';
import { useFormContext } from 'react-hook-form';
import { useLoloContext } from '@/contexts/LoloProvider';
import { ScheduledNotificationsUsersType } from '@/types/config/scheduled-notifications-users.type';

type ScheduledNotificationsUsersTableProps = {
  users: CustomerUserType[] 
  isLoading: boolean
  opts: Opts;
  setOpts: Dispatch<Opts>
}

const ScheduledNotificationsUsersTable = ( { users, isLoading, opts, setOpts }: ScheduledNotificationsUsersTableProps) => {
  const { getValues, setValue } = useFormContext()
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext(); 
  const [ selectedUsers, setSelectedUsers ] = useState<CustomerUserType[]>([])
  
  const scheduledNotificationsUsers = getValues('scheduledNotificationsUsers')

  const onChangeScheduledNotificationsUsers = (selectedScheduledNotificationsUsers: CustomerUserType) => {
    const isSelected = selectedUsers.some((user) => user.id === selectedScheduledNotificationsUsers.id)
    if (isSelected) {
      const newUsers = selectedUsers.filter((user) => user.id !== selectedScheduledNotificationsUsers.id)
      setSelectedUsers(newUsers)
      setValue('scheduledNotificationsUsers', newUsers)
    }
  }

  useEffect(()=>{
    setSelectedUsers(scheduledNotificationsUsers)
  }, [scheduledNotificationsUsers])
  return (
    <Container width="100%" height="500px" padding="20px">
      <Pagination count={users?.length} opts={opts} setOpts={setOpts} />
      <Table columns={usersColumns} loading={isLoading}>
        {users && users?.length
          ? users.map((record: CustomerUserType, index: number) => (
              <tr key={index} >
                <BodyCell textAlign="center">
                  <Checkbox />
                </BodyCell>
                <BodyCell textAlign="center">{record.name || ''}</BodyCell>
                <BodyCell textAlign="center">{record.lastName || ''}</BodyCell>
                <BodyCell textAlign="center">{record.role?.name || ''}</BodyCell>
                <BodyCell textAlign="center">{record.state ? 'activo' : 'inactivo'}</BodyCell>
              </tr>
            ))
          : null}
      </Table>
    </Container>
  )
}

export default ScheduledNotificationsUsersTable