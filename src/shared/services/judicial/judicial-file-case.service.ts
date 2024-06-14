import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import axiosClient from '../../utils/api/clientAxios'
import { JudicialCasefileProcessStatusType } from '@/types/judicial/judicial-case-file-process-status.type'

const API = axiosClient.getUri()

const url = `${API}/judicial/case-file`

export const getFileCaseByNumberFile = async (numberCase: string, chb: number) => {
  return await axiosClient.get(`${url}/number-case/${numberCase}/${chb}`)
}

export const getFileCasesRelated = async (numberCase: string, chb: number) => {
  return await axiosClient.get(`${url}/related/${numberCase}/${chb}`)
}

export const getFileCaseByClientId = async (id: number) => {
  return await axiosClient.get(`${url}/client/${id}`)
}

export const getFileCasesByCHB = async (
  id: number,
  page: number,
  limit: number,
  filter?: string,
  sorting?: {
    sortBy: string
    order: 'ASC' | 'DESC'
  },
  courts?: string,
  proceduralWays?: string,
  subjects?: string,
  users?: string
) => {
  let filters = ''
  filters += filter !== '' && filter !== undefined ? `filter=${filter}&` : ''
  filters += !!courts?.length ? `courts=${courts}&` : 'courts=[]&'
  filters += !!proceduralWays?.length ? `proceduralWays=${proceduralWays}&` : 'proceduralWays=[]&'
  filters += !!users?.length ? `users=${users}&` : 'users=[]&'
  filters += !!subjects?.length ? `subjects=${subjects}&` : 'subjects=[]&'
  filters += !!sorting ? `sortBy=${sorting.sortBy}&order=${sorting.order}&` : ''

  return await axiosClient.get(`${url}/chb/${id}?${filters}page=${page}&limit=${limit}`)
}

export const createQrCode = async (numberCase: number, chb: number) => {
  return await axiosClient.post(`${url}/qr-code/${numberCase}/${chb}`)
}

export const createFileCase = async (
  fileCase: Omit<JudicialCaseFileType, 'id' | 'numberCaseFile'>,
  customerId: string
) => {
  if (fileCase.demandDate) {
    let dia = fileCase.demandDate.split('-')
    let day = dia[0]
    let month = dia[1]
    fileCase.demandDate = `${dia[2]}-${month}-${day}`
    const demandDate = `${dia[2]}-${month}-${day}`
    return await axiosClient.post(`${url}/${customerId}`, { ...fileCase, demandDate })
  }
  return await axiosClient.post(`${url}/${customerId}`, fileCase)
}

export const updateFileCase = async (id: number, fileCase: Omit<JudicialCaseFileType, 'id' | 'clientId'>) => {
  if (fileCase.demandDate) {
    let dia = fileCase.demandDate.split('-')
    let day = dia[0]
    let month = dia[1]
    fileCase.demandDate = `${dia[2]}-${month}-${day}`
    const demandDate = `${dia[2]}-${month}-${day}`
    return await axiosClient.patch(`${url}/${id}`, { ...fileCase, demandDate })
  }
  return await axiosClient.patch(`${url}/${id}`, fileCase)
}

export const updateFileCaseProcessStatus = async (
  id: number,
  processStatus: Omit<JudicialCasefileProcessStatusType, 'id'>
) => {
  return await axiosClient.patch(`${url}/${id}/process-status`, processStatus)
}

export const deleteFileCase = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
