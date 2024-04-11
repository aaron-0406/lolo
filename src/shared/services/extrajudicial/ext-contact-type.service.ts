import { ExtContactTypeType } from '@/types/extrajudicial/ext-contact-type.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/cobranza/ext-contact-type`

export const getContactTypeByID = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const getContactTypeByCHB = async (chb: number) => {
  return await axiosClient.get(`${url}/all-data-by-chb/${chb}`)
}

export const createContactType = async (
  contactType: Omit<ExtContactTypeType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.post(url, contactType)
}

export const editContactType = async (
  contactType: Omit<ExtContactTypeType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  id: number
) => {
  return await axiosClient.patch(`${url}/${id}`, contactType)
}

export const deleteContactType = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
