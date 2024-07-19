import { JudicialRegistrationAreaType } from '@/types/judicial/judicial-registration-area.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri(); 
const url = `${API}/judicial/registration-area`

export const getJudicialRegistrationAreaById = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const getJudicialRegistrationAreaByCHB = async (chb: number) => {
  return await axiosClient.get(`${url}/chb/${chb}`)
}

export const createJudicialRegistrationArea = async (
  judicialRegistrationArea: Omit<JudicialRegistrationAreaType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.post(`${url}/`, judicialRegistrationArea)
}

export const editJudicialRegistrationArea = async (
  id:number, 
  judicialRegistrationArea: Omit<JudicialRegistrationAreaType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.patch(`${url}/${id}`, judicialRegistrationArea)
}

export const deleteJudicialRegistrationArea = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}