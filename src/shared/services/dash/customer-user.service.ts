import axiosClient from '../../utils/api/clientAxios'
import { CustomerUserType } from '@/types/dash/customer-user.type'

const API = axiosClient.getUri()

const url = `${API}/dash/customer-user`

export const getAll = async () => {
  return await axiosClient.get(`${url}/`)
}

export const getAllUsersByID = async (customerID: number) => {
  return await axiosClient.get(`${url}/users/${customerID}`)
}

export const getUserByUserId = async (userID: number) => {
  return await axiosClient.get(`${url}/${userID}`)
}

export const createUser = async (user: Omit<CustomerUserType, 'id' | 'permissions'>) => {
  return await axiosClient.post(`${url}/`, user)
}

export const editUserState = async (userID: number, state: boolean) => {
  return await axiosClient.patch(`${url}/state/${userID}`, { state })
}

export const editUserById = async (
  userID: number,
  user: Omit<CustomerUserType, 'id' | 'email' | 'password' | 'customerId' | 'createdAt' | 'permissions'>
) => {
  return await axiosClient.patch(`${url}/${userID}`, user)
}

export const removeCode2faUser = async (userID: number) => {
  return await axiosClient.patch(`${url}/code2fa/${userID}`)
}

export const deleteUser = async (userID: number) => {
  return await axiosClient.delete(`${url}/${userID}`)
}
