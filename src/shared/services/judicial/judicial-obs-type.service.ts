import { JudicialObsTypeType } from '@/types/judicial/judicial-obs-type.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/cobranza/obs-type`

export const getObsTypeByID = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const getObsTypeByCHB = async (chb: number) => {
  return await axiosClient.get(`${url}/all-data-by-chb/${chb}`)
}

export const createObsType = async (
  obsType: Omit<JudicialObsTypeType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.post(url, obsType)
}

export const editObsType = async (
  obsType: Omit<JudicialObsTypeType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  id: number
) => {
  return await axiosClient.patch(`${url}/${id}`, obsType)
}

export const deleteObsType = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
