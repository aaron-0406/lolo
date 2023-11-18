import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/judicial/case-file`

export const getFileCaseByNumberFile = async (numberCase: string) => {
  return await axiosClient.get(`${url}/number-case/${numberCase}`)
}

export const getFileCaseByClientId = async (id: number) => {
  return await axiosClient.get(`${url}/client/${id}`)
}

export const createFileCase = async (fileCase: Omit<JudicialCaseFileType, 'id' | 'numberCaseFile'>) => {
  return await axiosClient.post(`${url}/`, fileCase)
}

export const updateFileCase = async (id: number, fileCase: Omit<JudicialCaseFileType, 'id'>) => {
  return await axiosClient.patch(`${url}/${id}`, fileCase)
}

export const deleteFileCase = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
