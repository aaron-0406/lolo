import { JudicialSedeType } from '@/types/judicial/judicial-sede.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/judicial/sede`

export const getSedeByID = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const getSedeByCHB = async (chb: number, visible: boolean = false) => {
  return await axiosClient.get(`${url}/all-data-by-chb/${chb}?visible=${visible}`)
}

export const createSede = async (
  sede: Omit<JudicialSedeType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.post(url, sede)
}

export const editSede = async (
  sede: Omit<JudicialSedeType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  id: number
) => {
  return await axiosClient.patch(`${url}/${id}`, sede)
}

export const deleteSede = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
