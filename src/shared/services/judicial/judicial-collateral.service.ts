import { JudicialCollateralType } from '@/types/judicial/judicial-collateral.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri(); 
const url = `${API}/judicial/collateral`

export const getJudicialCollateralById = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const getJudicialCollateralByCHB = async (chb: number) => {
  return await axiosClient.get(`${url}/chb/${chb}`)
}

export const createJudicialCollateral = async (
  JudicialCollateral: Omit<JudicialCollateralType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.post(`${url}/`, JudicialCollateral)
}

export const editJudicialCollateral = async (
  id:number, 
  JudicialCollateral: Omit<JudicialCollateralType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.patch(`${url}/${id}`, JudicialCollateral)
}

export const deleteJudicialCollateral = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}