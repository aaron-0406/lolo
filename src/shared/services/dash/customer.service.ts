import { CustomerType } from '@/types/dash/customer.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/dash/customer`

export const getCustomerByUrl = async (urlIdentifier: string) => {
  return await axiosClient.get(`${url}/${urlIdentifier}`)
}

export const getCustomerAll = async () => {
  return await axiosClient.get(`${url}/`)
}

export const createClient = async (client: Omit<CustomerType, 'id' | 'customerBanks'>) => {
  return await axiosClient.post(`${url}/`, client)
}

export const editCustomerById = async (
  id: number,
  client: Omit<CustomerType, 'id' | 'customerBanks' | 'state' | 'createAt'>
) => {
  return await axiosClient.put(`${url}/${id}`, client)
}

export const updateStateCustomer = async (id: number, state: boolean) => {
  return await axiosClient.put(`${url}/state/${id}`, { state })
}
