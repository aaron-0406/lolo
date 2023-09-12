import { ProceduralWayType } from '@/types/judicial/procedural-way.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/judicial/procedural-way`

export const getProceduralWayByCHB = async (chb: number) => {
  return await axiosClient.get(`${url}/chb/${chb}`)
}

export const createProceduralWay = async (proceduralWay: Omit<ProceduralWayType, 'id'>) => {
  return await axiosClient.post(`${url}/`, proceduralWay)
}

export const updateProceduralWay = async (
  id: number,
  proceduralWay: Omit<ProceduralWayType, 'id' | 'customerHasBankId'>
) => {
  return await axiosClient.patch(`${url}/${id}`, proceduralWay)
}

export const deleteProceduralWay = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
