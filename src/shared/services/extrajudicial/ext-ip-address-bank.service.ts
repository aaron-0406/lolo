import axiosClient from '../../utils/api/clientAxios'
import { ExtIpAddressBankType } from '@/types/extrajudicial/ext-ip-address-bank.type'

const API = axiosClient.getUri()

const url = `${API}/cobranza/ip-address-bank`

export const getAllIpAddress = async () => {
  return await axiosClient.get(`${url}`)
}

export const getIpAddressById = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const getIpAddressByIp = async (ip: number) => {
  return await axiosClient.get(`${url}/${ip}`)
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

export const editStateIpAddress = async (id: number, state: boolean) => {
  return await axiosClient.patch(`${url}/state/${id}`, { state })
}

export const deleteIpAddress = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
