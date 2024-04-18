import { JudicialProceduralWayType } from '@/types/judicial/judicial-procedural-way.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/judicial/procedural-way`

export const getProceduralWayByCHB = async (chb: number) => {
  return await axiosClient.get(`${url}/chb/${chb}`)
}

export const getAllProceduralWayById = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const createProceduralWay = async (court: Omit<JudicialProceduralWayType, 'id'>) => {
  return await axiosClient.post(`${url}/`, court)
}

export const updateProceduralWay = async (
  id: number,
  court: Omit<JudicialProceduralWayType, 'id' | 'customerHasBankId'>
) => {
  return await axiosClient.patch(`${url}/${id}`, court)
}

export const deleteProceduralWay = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
