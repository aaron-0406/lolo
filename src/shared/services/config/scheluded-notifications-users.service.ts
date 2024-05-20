import axiosClient from '../../utils/api/clientAxios'
import { ScheduledNotificationsUsersType } from '@/types/config/scheduled-notifications-users.type'

const API = axiosClient.getUri()

const url = `${API}/config/scheduled-notifications-users`


export const getNotificationsUsersByScheduleNotificationId = async (scheduledNotificationId: number) => {
  return await axiosClient.get(`${url}/scheduled-notification/${scheduledNotificationId}`)
}

export const changeNotificationsUsers = async (
  idNotification: number,
  scheduledNotificationUser: string
) => {
  return await axiosClient.post(`${url}/change-notifications-users/${idNotification}`, {
    data: scheduledNotificationUser,
  })
}
