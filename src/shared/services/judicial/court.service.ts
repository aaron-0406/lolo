import { CourtType } from '@/types/judicial/court.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/judicial/court`

export const getCourtByCHB = async (chb: number) => {
  return await axiosClient.get(`${url}/chb/${chb}`)
}

export const createCourt = async (court: Omit<CourtType, 'id'>) => {
  return await axiosClient.post(`${url}/`, court)
}

export const updateCourt = async (id: number, court: Omit<CourtType, 'id' | 'customerHasBankId'>) => {
  return await axiosClient.patch(`${url}/${id}`, court)
}

export const deleteCourt = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
