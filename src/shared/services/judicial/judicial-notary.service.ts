import { JudicialNotaryType } from '@/types/judicial/judicial-notary.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri(); 
const url = `${API}/judicial/notary`

export const getJudicialNotaryById = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const getJudicialNotaryByCHB = async (chb: number) => {
  return await axiosClient.get(`${url}/chb/${chb}`)
}

export const createJudicialNotary = async (
  JudicialNotary: Omit<JudicialNotaryType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.post(`${url}/`, JudicialNotary)
}

export const editJudicialNotary = async (
  id:number, 
  JudicialNotary: Omit<JudicialNotaryType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.patch(`${url}/${id}`, JudicialNotary)
}

export const deleteJudicialNotary = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}