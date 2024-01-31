import axiosClient from '../../utils/api/clientAxios'
import { ExtTagGroupType } from '@/types/extrajudicial/ext-tag-group.type'

const API = axiosClient.getUri()

const url = `${API}/cobranza/ext-tag-group`

export const getExtTagGroupsByCHB = async (chb: number) => {
  return await axiosClient.get(`${url}/all-data-by-chb/${chb}`)
}

export const getExtTagGroupByID = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const createExtTagGroup = async (
  tagGroup: Omit<ExtTagGroupType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.post(url, tagGroup)
}

export const editExtTagGroup = async (
  tagGroup: Omit<ExtTagGroupType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  id: number
) => {
  return await axiosClient.patch(`${url}/${id}`, tagGroup)
}

export const deleteExtTagGroup = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
