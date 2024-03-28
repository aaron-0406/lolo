import axiosClient from '../../utils/api/clientAxios'
import { NegotiationType } from '@/types/extrajudicial/negotiation.type'

const API = axiosClient.getUri()

const url = `${API}/dash/negotiation`

export const getAll = async () => {
  return await axiosClient.get(`${url}/`)
}

export const getAllNegociacionesByCHB = async (chb: number, visible: boolean = false) => {
  return await axiosClient.get(`${url}/all/${chb}?visible=${visible}`)
}

export const getAllNegociacionesById = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const createNegotiation = async (negotiation: Omit<NegotiationType, 'id'>) => {
  return await axiosClient.post(`${url}/`, negotiation)
}

export const updateNegotiation = async (id: number, negotiation: Omit<NegotiationType, 'id'>) => {
  return await axiosClient.put(`${url}/${id}`, negotiation)
}

export const deleteNegotiation = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
