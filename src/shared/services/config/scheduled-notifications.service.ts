import { ScheduledNotificationsType } from '@/types/config/scheduled-notifications.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/config/scheduled-notifications`

export const getScheduledNotificationByChb = async (chb: number) => {
  return await axiosClient.get(`${url}/chb/${chb}`)
}

export const createScheduledNotification = async (
  ScheduledNotification: Omit<ScheduledNotificationsType, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
) => {
  return await axiosClient.post(`${url}/`, ScheduledNotification)
}

export const updateScheduledNotification = async (
  id: number,
  ScheduledNotification: Omit<
    ScheduledNotificationsType,
    'id' | 'customerHasBankId' | 'createdAt' | 'deletedAt' | 'updatedAt'
  >
) => {
  return await axiosClient.put(`${url}/${id}`, ScheduledNotification)
}

export const deleteScheduledNotification = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
