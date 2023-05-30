import { CustomerType } from '../types/customer.type'
import axiosClient from '../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/customer`

export const getCustomerByUrl = async (urlIdentifier: string) => {
  return await axiosClient.get(`${url}/${urlIdentifier}`)
}
export const getCustomerAll = async () => {
  return await axiosClient.get(`${url}/`)
}
export const createClient = async (client: Omit<CustomerType, 'id' | 'customerBanks'>) => {
  return await axiosClient.post(`${url}/`, client)
}
export const editCustomerById = async (Id: string, client: Omit<CustomerType, 'id' | 'customerBanks' | 'state'>) => {
  return await axiosClient.put(`${url}/:${Id}`, client)
}