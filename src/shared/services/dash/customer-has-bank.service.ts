import axiosClient from '../../utils/api/clientAxios'
import { CustomerHasBankType } from '@/types/dash/customer-has-bank'

const API = axiosClient.getUri()

const url = `${API}/dash/customer-bank`

export const getAllCHBs = async () => {
  return await axiosClient.get(`${url}/`)
}

export const getCHBById = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const getAllCHBsByCustomerId = async (idCustomer: number) => {
  return await axiosClient.get(`${url}/customer/${idCustomer}`)
}

export const assingCHB = async (chb: Omit<CustomerHasBankType, 'id'>) => {
  return await axiosClient.post(`${url}/`, chb)
}

export const revokeCHB = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
