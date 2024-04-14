import { JudicialSubjectType } from '@/types/judicial/judicial-subject.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/judicial/subject`

export const getSubjectByCHB = async (chb: number) => {
  return await axiosClient.get(`${url}/chb/${chb}`)
}

export const getAllSubjectById = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const createSubject = async (court: Omit<JudicialSubjectType, 'id'>) => {
  return await axiosClient.post(`${url}/`, court)
}

export const updateSubject = async (id: number, court: Omit<JudicialSubjectType, 'id' | 'customerHasBankId'>) => {
  return await axiosClient.patch(`${url}/${id}`, court)
}

export const deleteSubject = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
