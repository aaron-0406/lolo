import axiosClient from '../utils/api/clientAxios'
import { BankType } from '../types/bank.type'

const API = axiosClient.getUri()

const url = `${API}/bank`

export const getAllBanks = async () => {
  return await axiosClient.get(`${url}/`)
}

export const getAllBankById = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const createBank = async (bank: Omit<BankType, 'id'>) => {
  return await axiosClient.post(`${url}/`, bank)
}

export const updateBank = async (id: number, bank: Omit<BankType, 'id'>) => {
  return await axiosClient.put(`${url}/${id}`, bank)
}

export const deleteBank = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}