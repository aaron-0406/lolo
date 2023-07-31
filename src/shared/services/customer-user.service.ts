import axiosClient from '../utils/api/clientAxios'
import { CustomerUserType } from '../types/customer-user.type'

const API = axiosClient.getUri()

const url = `${API}/customer-user`

export const getAll = async () => {
  return await axiosClient.get(`${url}/`)
}
export const getAllUsersByCustomerID = async (customerID: number) => {
  return await axiosClient.get(`${url}/users/${customerID}`)
}
export const getUserByUserId = async (userID: number) => {
  return await axiosClient.get(`${url}/${userID}`)
}
export const createClient = async (user: Omit<CustomerUserType, 'id'>) => {
  return await axiosClient.post(`${url}/`, user)
}
export const editUserState = async (userID: number, state: boolean) => {
  return await axiosClient.patch(`${url}/state/${userID}`, state)
}
export const editUserById = async (
  userID: number,
  user: Omit<CustomerUserType, 'id' | 'email' | 'password' | 'customerId' | 'createdAt'>
) => {
  return await axiosClient.patch(`${url}/${userID}`, user)
}
export const deleteUser = async (userID: number) => {
  return await axiosClient.delete(`${url}/${userID}`)
}
