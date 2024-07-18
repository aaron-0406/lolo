import axiosClient from '../../utils/api/clientAxios'
import { JudicialCollateralAuctionRoundType } from '@/types/judicial/judicial-collateral-auction.type'

const API = axiosClient.getUri()

const url = `${API}/judicial/collateral-auction-round`

export const getAllJudicialCollateralAuctionRoundByCollateralId = async (
  chb: number, collateralId: number
) => {
  return await axiosClient.get(`${url}/${chb}/${collateralId}`)
}

export const getAllJudicialAuctionsRoundByCaseFileId = async (caseFileId: number) => {
  return await axiosClient.get(`${url}/${caseFileId}`)
}

export const getJudicialCollateralAuctionRoundByCollateralId = async (
  
  chb: number, collateralId: number, id: number
) => {
  return await axiosClient.get(`${url}/${chb}/${collateralId}/${id}`)
}
export const createJudicialCollateralAuctionRound = async (
  data: Omit<JudicialCollateralAuctionRoundType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
) => {
  return await axiosClient.post(`${url}/`, data)
}

export const editJudicialCollateralAuctionRound = async (
  chb: number,
  collateralId: number,
  id: number,
  data: Omit<JudicialCollateralAuctionRoundType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.patch(`${url}/${chb}/${collateralId}/${id}`, data)
}

export const deleteJudicialCollateralAuctionRound = async (chb: number, collateralId: number, id: number) => {
  return await axiosClient.delete(`${url}/${chb}/${collateralId}/${id}`)
}