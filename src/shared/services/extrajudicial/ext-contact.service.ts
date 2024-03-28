import axiosClient from '../../utils/api/clientAxios'
import { ExtContactType } from '@/types/extrajudicial/ext-contact.type'

const API = axiosClient.getUri()

const url = `${API}/cobranza/contact`

export const getExtContactsByClientID = async (clientId: number, visible: boolean = false) => {
  return await axiosClient.get(`${url}/all-client/${clientId}?visible=${visible}`)
}

export const getExtContactsByID = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const createExtContact = async (
  contact: Omit<ExtContactType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.post(url, contact)
}

export const editExtContact = async (
  contact: Omit<ExtContactType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  id: number
) => {
  return await axiosClient.patch(`${url}/${id}`, contact)
}

export const deleteExtContact = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
