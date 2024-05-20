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
import { getNotificationsUsersByScheduleNotificationId } from '@/services/config/scheluded-notifications-users.service';
import { useMutation } from 'react-query'
import { AxiosResponse, AxiosError } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { notification } from '../../../../../../../../ui/notification/notification';

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
  const scheduledNotification = getValues('scheduledNotification') 

  const [ currentScheduledNotificationsUsers, setCurrentScheduledNotificationsUsers ] = useState<ScheduledNotificationsUsersType[]>([])
  
  const onAssingNotificationUser = (idUser: number) => {
    const { scheduledNotificationsUsers } = getValues()
    const isAssigned = scheduledNotificationsUsers.some(
      (scheduledNotificationUser: ScheduledNotificationsUsersType) =>
        scheduledNotificationUser.customerUserId === idUser
    )
    if (!isAssigned) {
      const newNotificationUser:Omit<ScheduledNotificationsUsersType, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'> = {
        customerUserId: idUser,
        scheduledNotificationId: getValues('scheduledNotification')?.id ?? 0,
        customerHasBankId: getValues('scheduledNotification')?.customerHasBankId ?? chb ?? 0,
      }
      const newAssignedArray = [...scheduledNotificationsUsers, newNotificationUser] as ScheduledNotificationsUsersType[]
      setCurrentScheduledNotificationsUsers(newAssignedArray)
    }
    else{
      const newDeallocatedArray = scheduledNotificationsUsers.filter(
        (scheduledNotificationUser: ScheduledNotificationsUsersType) =>
          scheduledNotificationUser.customerUserId !== idUser
      )
      setCurrentScheduledNotificationsUsers(newDeallocatedArray) 
    }
  }

  const { mutate: getNotificationsUsersbyNotificationIdMt } = useMutation<
    AxiosResponse<ScheduledNotificationsUsersType[]>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      return await getNotificationsUsersByScheduleNotificationId(scheduledNotification?.id ?? 0)
    },
    {
      onSuccess: (result) => {
        setCurrentScheduledNotificationsUsers(result.data)
      },
      onError: (error, _, context: any) => {
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data.errors?.map((error) => error.message),
        })
      },
    }
  )


  useEffect(() => {
    setValue('scheduledNotificationsUsers', currentScheduledNotificationsUsers)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentScheduledNotificationsUsers])
  useEffect(() => {
    scheduledNotification && getNotificationsUsersbyNotificationIdMt()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[scheduledNotification])


  return (
    <Container width="100%" height="500px" padding="20px">
      <Pagination count={users?.length} opts={opts} setOpts={setOpts} />
      <Table columns={usersColumns} loading={isLoading}>
        {users && users?.length
          ? users.map((record: CustomerUserType, index: number) => (
              <tr key={index}>
                <BodyCell textAlign="center">
                  <Checkbox
                    checked={currentScheduledNotificationsUsers.some(
                      (scheduledNotificationUser: ScheduledNotificationsUsersType) =>
                        scheduledNotificationUser.customerUserId === record.id
                    )}
                    onChange={() => onAssingNotificationUser(record.id)}
                  />
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