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

export const getFileCasesByCHB = async (id: number, page: number, limit: number) => {
  return await axiosClient.get(`${url}/chb/${id}?page=${page}&limit=${limit}`)
}

export const createFileCase = async (fileCase: Omit<JudicialCaseFileType, 'id' | 'numberCaseFile'>) => {
  let dia = fileCase.demandDate.split('-')
  let day = dia[0]
  let month = dia[1]
  fileCase.demandDate = `${dia[2]}-${month}-${day}`
  const demandDate = `${dia[2]}-${month}-${day}`
  return await axiosClient.post(`${url}/`, { ...fileCase, demandDate })
}

export const updateFileCase = async (id: number, fileCase: Omit<JudicialCaseFileType, 'id' | 'clientId'>) => {
  let dia = fileCase.demandDate.split('-')
  let day = dia[0]
  let month = dia[1]
  fileCase.demandDate = `${dia[2]}-${month}-${day}`
  const demandDate = `${dia[2]}-${month}-${day}`
  return await axiosClient.patch(`${url}/${id}`, { ...fileCase, demandDate })
}

export const deleteFileCase = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
