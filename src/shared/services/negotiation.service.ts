import axiosClient from '../utils/api/clientAxios'
import { NegotiationType } from '../types/negotiation.type'

const API = axiosClient.getUri()

const url = `${API}/negotiation`

export const getAll = async () => {
  return await axiosClient.get(`${url}/`)
}

export const getAllNegociacionesByCHB = async (chb: string) => {
  return await axiosClient.get(`${url}/all/${chb}`)
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
