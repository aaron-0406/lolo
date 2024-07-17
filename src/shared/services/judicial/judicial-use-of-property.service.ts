import { JudicialUseOfPropertyType } from '@/types/judicial/judicial-use-of-property.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri(); 
const url = `${API}/judicial/use-of-property`

export const getJudicialUseOfPropertyById = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const getJudicialUseOfPropertyByCHB = async (chb: number) => {
  return await axiosClient.get(`${url}/chb/${chb}`)
}

export const createJudicialUseOfProperty = async (
  judicialUseOfProperty: Omit<JudicialUseOfPropertyType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.post(`${url}/`, judicialUseOfProperty)
}

export const editJudicialUseOfProperty = async (
  id:number, 
  judicialUseOfProperty: Omit<JudicialUseOfPropertyType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.patch(`${url}/${id}`, judicialUseOfProperty)
}

export const deleteJudicialUseOfProperty = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}