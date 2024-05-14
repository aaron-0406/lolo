import { JudicialProcessReasonType } from '@/types/judicial/judicial-process-reason.types'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/judicial/process-reason`

export const getAllProcessesReason = async () => {
  return await axiosClient.get(`${url}/`)
}

export const getProcessReasonByID = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const getAllProcessReasonByCHB = async (chb: number) => {
  return await axiosClient.get(`${url}/chb/${chb}`)
}

export const createProcessReason = async (
  obsType: Omit<JudicialProcessReasonType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.post(url, obsType)
}

export const editProcessReason = async (
  id: number,
  obsType: Omit<JudicialProcessReasonType,'id'| 'createdAt' | 'updatedAt' | 'deletedAt' | 'customerHasBankId'>,
) => {
  return await axiosClient.patch(`${url}/${id}`, obsType)
}

export const deleteProcessReason = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
