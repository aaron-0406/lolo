import { JudicialBinProceduralStageType } from '@/types/judicial/judicial-bin-procedural-stage.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/judicial/bin-procedural-stage`

export const getJudicialBinProceduralStageByCHB = async (chb: number) => {
  return await axiosClient.get(`${url}/chb/${chb}`)
}

export const getJudicialBinProceduralStageById = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const createJudicialBinProceduralStage = async (
  binnacle: Omit<JudicialBinProceduralStageType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.post(`${url}/`, binnacle)
}

export const updateJudicialBinProceduralStage = async (
  id: number,
  binnacle: Omit<JudicialBinProceduralStageType, 'id' | 'customerHasBankId' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.patch(`${url}/${id}`, binnacle)
}

export const deleteJudicialBinProceduralStage = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
