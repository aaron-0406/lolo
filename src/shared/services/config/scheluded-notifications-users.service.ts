import axiosClient from '../../utils/api/clientAxios'
import { ScheduledNotificationsUsersType } from '@/types/config/scheduled-notifications-users.type'

const API = axiosClient.getUri()

const url = `${API}/config/scheduled-notifications-users`

export const getAllNotificationsUsers = async () => {
  return await axiosClient.get(`${url}/`)
}

export const getNotificationsUsersById = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const getNotificationsUsersByCustomerId = async (customerId: number) => {
  return await axiosClient.get(`${url}/customer/${customerId}`)
}

export const getNotificationsUsersByChb = async (chb: number) => {
  return await axiosClient.get(`${url}/chb/${chb}`)
}

export const getNotificationsUsersByScheduleNotificationId = async (scheduledNotificationUserId: number) => {
  return await axiosClient.get(`${url}/scheduled-notification/${scheduledNotificationUserId}`)
}

export const createNotificationsUsers = async (scheduledNotificationsUser: Omit<ScheduledNotificationsUsersType, "id" | "createdAt" | "updatedAt" | "deletedAt">) => {
  return await axiosClient.post(`${url}/`, scheduledNotificationsUser)
}

export const updateNotificationsUser = async (
  id: number,
  scheduledNotificationUser: Omit<ScheduledNotificationsUsersType, 'id' | 'customerHasBankId' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.put(`${url}/${id}`, scheduledNotificationUser)
}

export const deleteBank = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
