import { DirectionType } from '../../types/extrajudicial/direction.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/cobranza/direction`

export const getDirectionsByClientID = async (clientId: number) => {
  return await axiosClient.get(`${url}/all-client/${clientId}`)
}

export const createDirection = async (direction: Omit<DirectionType, 'id'>) => {
  return await axiosClient.post(url, direction)
}
export const editDirection = async (direction: Omit<DirectionType, 'id' | 'clientId'>, id: number) => {
  return await axiosClient.patch(`${url}/${id}`, direction)
}
export const deleteDirection = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
