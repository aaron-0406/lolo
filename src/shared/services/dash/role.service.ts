import axiosClient from '../../utils/api/clientAxios'
import { RoleType } from '../../types/dash/role.type'

const API = axiosClient.getUri()

const url = `${API}/dash/role`

export const getAllRolesByCustomerId = async (customerId: number) => {
  return await axiosClient.get(`${url}/customer/${customerId}`)
}

export const getRoleById = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const createRole = async (role: Omit<RoleType, 'id'>) => {
  return await axiosClient.post(`${url}/`, role)
}

export const updateRole = async (id: number, role: Omit<RoleType, 'id' | 'customerId'>) => {
  return await axiosClient.put(`${url}/${id}`, role)
}

export const deleteRole = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
