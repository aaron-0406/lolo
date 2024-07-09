import { JudicialRegisterOfficeType } from '@/types/judicial/judicial-register-office.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri(); 
const url = `${API}/judicial/register-office`

export const getJudicialRegisterOfficeById = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const getJudicialRegisterOfficeByCHB = async (chb: number) => {
  return await axiosClient.get(`${url}/chb/${chb}`)
}

export const createJudicialRegisterOffice = async (
  JudicialRegisterOffice: Omit<JudicialRegisterOfficeType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.post(`${url}/`, JudicialRegisterOffice)
}

export const editJudicialRegisterOffice = async (
  id:number, 
  JudicialRegisterOffice: Omit<JudicialRegisterOfficeType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.patch(`${url}/${id}`, JudicialRegisterOffice)
}

export const deleteJudicialRegisterOffice = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}