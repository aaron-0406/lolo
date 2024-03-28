import { DirectionType } from '@/types/extrajudicial/direction.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/cobranza/direction`

export const getDirectionByID = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const getDirectionsByClientID = async (clientId: number, visible: boolean = false) => {
  return await axiosClient.get(`${url}/all-client/${clientId}?visible=${visible}`)
}

export const createDirection = async (direction: Omit<DirectionType, 'id' | 'createdAt'>) => {
  return await axiosClient.post(url, direction)
}

export const editDirection = async (direction: Omit<DirectionType, 'id' | 'clientId' | 'createdAt'>, id: number) => {
  return await axiosClient.patch(`${url}/${id}`, direction)
}

export const deleteDirection = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
