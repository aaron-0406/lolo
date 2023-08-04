import axiosClient from '../utils/api/clientAxios'
import { ManagementActionType } from '../types/management-action.type'

const API = axiosClient.getUri()

const url = `${API}/management-action`

export const getAll = async () => {
  return await axiosClient.get(`${url}/`)
}

export const getAllManagementActionsByCHB = async (chb: string) => {
  return await axiosClient.get(`${url}/all/${chb}`)
}

export const getManagementActionById = async (ID: number) => {
  return await axiosClient.get(`${url}/${ID}`)
}

export const createManagementAction = async (ManAct: Omit<ManagementActionType, 'id'>) => {
  return await axiosClient.post(`${url}/`, ManAct)
}

export const updateManagementAction = async (ID: number, ManAct: Omit<ManagementActionType, 'id'>) => {
  return await axiosClient.put(`${url}/${ID}`, ManAct)
}

export const deleteManagementAction = async (ID: number) => {
  return await axiosClient.delete(`${url}/${ID}`)
}
