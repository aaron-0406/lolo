import { JudicialBinDefendantProceduralActionType } from '@/types/judicial/judicial-bin-defendant-procedural-action.type'
import axiosClient from '../../utils/api/clientAxios'   

const API = axiosClient.getUri()

const url = `${API}/judicial/bin-defendant-procedural-action`

export const getJudicialBinDefendantProceduralActionByCHB = async (chb: number) => {
  return await axiosClient.get(`${url}/chb/${chb}`)
}

export const getJudicialBinDefendantProceduralActionById = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const createJudicialBinDefendantProceduralAction = async (
  defendantProceduralAction: Omit<JudicialBinDefendantProceduralActionType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.post(`${url}/`, defendantProceduralAction)
}

export const updateJudicialBinDefendantProceduralAction = async (
  id: number,
  defendantProceduralAction: Omit<
    JudicialBinDefendantProceduralActionType,
    'id' | 'customerHasBankId' | 'createdAt' | 'updatedAt' | 'deletedAt'
  >
) => {
  return await axiosClient.patch(`${url}/${id}`, defendantProceduralAction)
}

export const deleteJudicialBinDefendantProceduralAction = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
