import { TariffType } from '@/types/config/tariff.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/config/tariff`

export const getTariff = async (chb: number) => {
  return await axiosClient.get(`${url}/${chb}`)
}

export const createTariff = async (
  data: Omit<TariffType, 'id' | 'tariffIntervalMatch'>,
) => {
  return await axiosClient.post(`${url}`, data)
}

export const editTariff = async (
  id:number,
  data: Omit<TariffType, "id" | 'tariffIntervalMatch'>,
) => {
  return await axiosClient.patch(`${url}/${id}`, data)
}

export const deleteTariff = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
