import axiosClient from '../../utils/api/clientAxios'
import { ExtIpAddressBankType } from '@/types/extrajudicial/ext-ip-address-bank.type'

const API = axiosClient.getUri()

const url = `${API}/cobranza/ext-ip-address-bank`

export const getAllIpAddress = async (customerId: number) => {
  return await axiosClient.get(`${url}/${customerId}`)
}

export const getIpAddressById = async (id: number, customerId: number) => {
  return await axiosClient.get(`${url}/id-address/${id}/${customerId}`)
}

export const getIpAddressByIp = async (ip: number, customerId: number) => {
  return await axiosClient.get(`${url}/ip-address/${ip}/${customerId}`)
}

export const createIpAddress = async (
  ipAddress: Omit<ExtIpAddressBankType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.post(url, ipAddress)
}

export const editIpAddress = async (
  ipAddress: Omit<ExtIpAddressBankType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  id: number
) => {
  return await axiosClient.patch(`${url}/${id}`, ipAddress)
}

export const editStateIpAddress = async (id: number, customerId: number, state: boolean) => {
  return await axiosClient.patch(`${url}/state/${id}/${customerId}`, { state })
}

export const deleteIpAddress = async (id: number, customerId: number) => {
  return await axiosClient.delete(`${url}/${id}/${customerId}`)
}
