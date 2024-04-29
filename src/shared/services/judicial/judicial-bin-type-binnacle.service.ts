import { JudicialBinTypeBinnacleType } from '@/types/judicial/judicial-bin-type-binnacle.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/judicial/bin-type-binnacle`

export const getJudicialBinTypeBinnacleByCHB = async (chb: number) => {
  return await axiosClient.get(`${url}/chb/${chb}`)
}

export const getJudicialBinTypeBinnacleById = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const createJudicialBinTypeBinnacle = async (
  binnacle: Omit<JudicialBinTypeBinnacleType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.post(`${url}/`, binnacle)
}

export const updateJudicialBinTypeBinnacle = async (
  id: number,
  binnacle: Omit<JudicialBinTypeBinnacleType, 'id' | 'customerHasBankId' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.patch(`${url}/${id}`, binnacle)
}

export const deleteJudicialBinTypeBinnacle = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
