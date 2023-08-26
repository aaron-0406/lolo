import axiosClient from '../../utils/api/clientAxios'
import { PermissionType } from '@/types/dash/permission.type'

const API = axiosClient.getUri()

const url = `${API}/dash/permission`

export const getAllPermissions = async (code?: string) => {
  return await axiosClient.get(`${url}${code ? '?code=' + code : ''}`)
}

export const getPermissionById = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const createPermission = async (permission: Omit<PermissionType, 'id'>) => {
  return await axiosClient.post(`${url}/`, permission)
}

export const updatePermission = async (id: number, permission: Omit<PermissionType, 'id'>) => {
  return await axiosClient.put(`${url}/${id}`, permission)
}

export const deletePermission = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
