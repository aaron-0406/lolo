import { ExtAddressType } from '@/types/extrajudicial/ext-address-type.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/cobranza/ext-address-type`

export const getAddressTypeByID = async (id: number, chb: number) => {
  return await axiosClient.get(`${url}/${id}/${chb}`)
}

export const getAddressesTypeByCHB = async (chb: number) => {
  return await axiosClient.get(`${url}/all/${chb}`)
}

export const createAddressType = async (
  address: Omit<ExtAddressType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.post(url, address)
}

export const editAddressType = async (
  address: Omit<ExtAddressType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  id: number
) => {
  return await axiosClient.patch(`${url}/${id}`, address)
}

export const deleteAddressType = async (id: number, chb: number) => {
  return await axiosClient.delete(`${url}/${id}/${chb}`)
}
