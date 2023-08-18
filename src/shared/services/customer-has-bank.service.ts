import axiosClient from '../utils/api/clientAxios'
import { CustomerHasBankType } from '../types/customer-has-bank'

const API = axiosClient.getUri()

const url = `${API}/customer-bank`

export const getAllCustomerBanks = async () => {
  return await axiosClient.get(`${url}/`)
}

export const getAllByIdCustomer = async (id: number) => {
  return await axiosClient.get(`${url}/customer/${id}`)
}

export const assingCustomerBank = async (chb: Omit<CustomerHasBankType, "id">) => {
  return await axiosClient.post(`${url}/`, chb)
}

export const deleteCustomerBank = async (idCustomer: number, idBank: number) => {
  return await axiosClient.delete(`${url}/${idCustomer}/${idBank}`)
}
