import axiosClient from '../../utils/api/clientAxios'
import { ManagementActionType } from '@/types/dash/management-action.type'

const API = axiosClient.getUri()

const url = `${API}/dash/management-action`

export const getAll = async () => {
  return await axiosClient.get(`${url}/`)
}

export const getAllManagementActionsByCHB = async (chb: string) => {
  return await axiosClient.get(`${url}/all/${chb}`)
}

export const getManagementActionById = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const createManagementAction = async (manAct: Omit<ManagementActionType, 'id'>) => {
  return await axiosClient.post(`${url}/`, manAct)
}

export const updateManagementAction = async (id: number, manAct: Omit<ManagementActionType, 'id'>) => {
  return await axiosClient.put(`${url}/${id}`, manAct)
}

export const deleteManagementAction = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
