import { FileCaseType } from '@/types/judicial/case-file.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/judicial/case-file`

export const getFileCaseByNumberFile = async (numberCase: string) => {
  return await axiosClient.get(`${url}/number-case/${numberCase}`)
}

export const createFileCase = async (fileCase: Omit<FileCaseType, 'id' | 'numberCaseFile'>) => {
  return await axiosClient.post(`${url}/`, fileCase)
}

export const updateFileCase = async (id: number, fileCase: Omit<FileCaseType, 'id'>) => {
  return await axiosClient.patch(`${url}/${id}`, fileCase)
}

export const deleteFileCase = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
