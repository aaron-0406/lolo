import { JudicialCollateralChargesEncumbrancesType } from '@/types/judicial/judicial-collateral-charges-encumbrances.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri(); 
const url = `${API}/judicial/collateral-charges-encumbrances`

export const getJudicialCollateralChargesEncumbrancesById = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const getJudicialCollateralChargesEncumbrancesByCollateral = async (collateralId: number) => { 
  return await axiosClient.get(`${url}/all-charges-encumbrances/${collateralId}`)
}

export const createJudicialCollateralChargesEncumbrances = async (
  JudicialCollateralChargesEncumbrances: Omit<JudicialCollateralChargesEncumbrancesType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.post(`${url}/`, JudicialCollateralChargesEncumbrances)
}

export const editJudicialCollateralChargesEncumbrances = async (
  id:number, 
  JudicialCollateralChargesEncumbrances: Omit<JudicialCollateralChargesEncumbrancesType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.patch(`${url}/${id}`, JudicialCollateralChargesEncumbrances)
}

export const deleteJudicialCollateralChargesEncumbrances = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}