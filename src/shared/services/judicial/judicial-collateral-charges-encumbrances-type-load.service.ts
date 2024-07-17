import { JudicialCollateralChargesEncumbrancesTypeLoadType } from '@/types/judicial/judicial-collateral-charges-encumbrances-type-load.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri(); 
const url = `${API}/judicial/collateral-charges-encumbrances-type-load`

export const getJudicialCollateralChargesEncumbrancesTypeLoadById = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const getJudicialCollateralChargesEncumbrancesTypeLoadByCHB = async (chb: number) => {
  return await axiosClient.get(`${url}/chb/${chb}`)
}

export const createJudicialCollateralChargesEncumbrancesTypeLoad = async (
  JudicialCollateralChargesEncumbrancesTypeLoad: Omit<JudicialCollateralChargesEncumbrancesTypeLoadType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.post(`${url}/`, JudicialCollateralChargesEncumbrancesTypeLoad)
}

export const editJudicialCollateralChargesEncumbrancesTypeLoad = async (
  id:number, 
  JudicialCollateralChargesEncumbrancesTypeLoad: Omit<JudicialCollateralChargesEncumbrancesTypeLoadType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.patch(`${url}/${id}`, JudicialCollateralChargesEncumbrancesTypeLoad)
}

export const deleteJudicialCollateralChargesEncumbrancesTypeLoad = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}