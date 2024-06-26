import { JudicialCollateralType } from '@/types/judicial/judicial-collateral.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri(); 
const url = `${API}/judicial/collateral`

export const getJudicialCollateralById = async (id: string) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const getJudicialCollateralByCHB = async (chb: number) => {
  return await axiosClient.get(`${url}/chb/${chb}`)
}

export const getJudicialCollateralByCaseFileId = async (caseFileId: number) => {
  return await axiosClient.get(`${url}/all/${caseFileId}`)
}


export const createJudicialCollateral = async (
  JudicialCollateral: Omit<JudicialCollateralType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  caseFileId: number
) => {
  return await axiosClient.post(`${url}/${caseFileId}`, JudicialCollateral)
}

export const editJudicialCollateral = async (
  id:string, 
  JudicialCollateral: Omit<JudicialCollateralType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  console.log(JudicialCollateral)
  return await axiosClient.patch(`${url}/${id}`, JudicialCollateral)
}

export const deleteJudicialCollateral = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}