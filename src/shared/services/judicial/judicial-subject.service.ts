import { JudicialSubjectType } from '@/types/judicial/judicial-subject.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/judicial/subject`

export const getSubjectByCHB = async (chb: number) => {
  return await axiosClient.get(`${url}/chb/${chb}`)
}

export const createSubject = async (subjet: Omit<JudicialSubjectType, 'id'>) => {
  return await axiosClient.post(`${url}/`, subjet)
}

export const updateSubject = async (id: number, subjet: Omit<JudicialSubjectType, 'id' | 'customerHasBankId'>) => {
  return await axiosClient.patch(`${url}/${id}`, subjet)
}

export const deleteSubject = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
