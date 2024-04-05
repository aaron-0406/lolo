import axiosClient from '../../utils/api/clientAxios'
import { ExtOfficeType } from '@/types/extrajudicial/ext-office.type'

const API = axiosClient.getUri()

const url = `${API}/cobranza/ext-office`

export const getAllOffices = async (customerId: number) => {
  return await axiosClient.get(`${url}/${customerId}`)
}

export const getOficesByCityId = async (cityId: number) => {
  return await axiosClient.get(`${url}/city/${cityId}`)
}

export const getOfficeById = async (id: number, customerId: number) => {
  return await axiosClient.get(`${url}/id-office/${id}/${customerId}`)
}

export const createOffice = async (office: Omit<ExtOfficeType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>) => {
  return await axiosClient.post(url, office)
}

export const editOffice = async (
  office: Omit<ExtOfficeType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  id: number
) => {
  return await axiosClient.patch(`${url}/${id}`, office)
}

export const editStateOffice = async (id: number, customerId: number, state: boolean) => {
  return await axiosClient.patch(`${url}/state/${id}/${customerId}`, { state })
}

export const deleteOffice = async (id: number, customerId: number) => {
  return await axiosClient.delete(`${url}/${id}/${customerId}`)
}
