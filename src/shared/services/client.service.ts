import { ClientType } from '../types/client.type'
import axiosClient from '../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/client`

export const getAllClientsByCHB = async (
  chb: string,
  page: number,
  limit: number,
  filter?: string,
  negotiations?: string,
  funcionarios?: string,
  users?: string,
  cities?: string
) => {
  let filters = ''
  filters += filter !== '' && filter !== undefined ? `filter=${filter}&` : ''
  filters += !!negotiations?.length ? `negotiations=${negotiations}&` : 'negotiations=[]&'
  filters += !!funcionarios?.length ? `funcionarios=${funcionarios}&` : 'funcionarios=[]&'
  filters += !!users?.length ? `users=${users}&` : 'users=[]&'
  filters += !!cities?.length ? `cities=${cities}&` : 'cities=[]&'

  return await axiosClient.get(`${url}/${chb}?${filters}page=${page}&limit=${limit}`)
}

export const getClientByCode = async (code: string, chb: string) => {
  return await axiosClient.get(`${url}/${code}/${chb}`)
}

export const getAllClientsByCHBDetails = async (chb: string) => {
  return await axiosClient.get(`${url}/${chb}/details`)
}

export const createClient = async (client: Omit<ClientType, 'id'>, idCustomer: number) => {
  return await axiosClient.post(`${url}/${idCustomer}`, client)
}

export const updateClient = async (
  code: string,
  chb: number,
  client: Omit<ClientType, 'id' | 'code' | 'customerHasBankId'>
) => {
  return await axiosClient.patch(`${url}/${code}/${chb}`, client)
}

export const deleteClient = async (code: string, chb: number, idCustomer: number) => {
  return await axiosClient.delete(`${url}/${code}/${chb}/${idCustomer}`)
}

export const generateExcelOnDailyManagementService = async () => {
  return await axiosClient.get(`${url}/download-excel-daily-management`, {
    responseType: 'blob',
  })
}
