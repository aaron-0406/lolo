import axiosClient from '../../utils/api/clientAxios'
import { ExtTagType } from '@/types/extrajudicial/ext-tag.type'

const API = axiosClient.getUri()

const url = `${API}/cobranza/ext-tag`

export const getExtTagsByCHB = async (chb: number, visible: boolean = false) => {
  return await axiosClient.get(`${url}/all-data-by-chb/${chb}?visible=${visible}`)
}

export const getExtTagsByCHBAndTagGroupId = async (chb: number, tagGroupId: number) => {
  return await axiosClient.get(`${url}/all-data-by-chb-and-tag-group-id/${chb}/${tagGroupId}`)
}

export const getExtTagByID = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const createExtTag = async (tag: Omit<ExtTagType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>) => {
  return await axiosClient.post(url, tag)
}

export const editExtTag = async (tag: Omit<ExtTagType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>, id: number) => {
  return await axiosClient.patch(`${url}/${id}`, tag)
}

export const updateExtTagAction = async (id: number, action: boolean) => {
  return await axiosClient.patch(`${url}/action/${id}`, { action })
}

export const deleteExtTag = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
