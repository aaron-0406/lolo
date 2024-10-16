import { ClientType } from '@/types/extrajudicial/client.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/cobranza/client`

export const getAllClientsByCHB = async (
  chb: string,
  archived: boolean,
  page: number,
  limit: number,
  filter?: string,
  negotiations?: string,
  funcionarios?: string,
  users?: string,
  cities?: string,
) => {
  let filters = ''
  filters += filter !== '' && filter !== undefined ? `filter=${filter}&` : ''
  filters += !!negotiations?.length ? `negotiations=${negotiations}&` : 'negotiations=[]&'
  filters += !!funcionarios?.length ? `funcionarios=${funcionarios}&` : 'funcionarios=[]&'
  filters += !!users?.length ? `users=${users}&` : 'users=[]&'
  filters += !!cities?.length ? `cities=${cities}&` : 'cities=[]&'

  return await axiosClient.get(`${url}/${chb}?${filters}page=${page}&limit=${limit}&archived=${archived}`)
}

export const getClientByCode = async (code: string, chb: string) => {
  return await axiosClient.get(`${url}/${code}/${chb}`)
}

export const getClientByNameOrCode = async (name: string, chb: string) => {
  return await axiosClient.get(`${url}/${chb}/by-name-or-code?filter=${name}`)
}

export const getAllClientsByCHBDetails = async (chb: string) => {
  return await axiosClient.get(`${url}/${chb}/details`)
}

export const saveClient = async (
  client: Omit<ClientType, 'memoAssignmentDate'> & { memoAssignmentDate?: Date },
  idCustomer: number
) => {
  return await axiosClient.post(`${url}/${idCustomer}`, client)
}

export const updateClients = async (clients: ClientType[], chb: string) => {
  return await axiosClient.patch(`${url}/${chb}`, {clients: clients})
}

export const tranferClientToAnotherBank = async (code: string, chb: string, chbTransferred: string) => {
  return await axiosClient.patch(`${url}/transfer-client-to-another-bank/${chb}`, { code, chbTransferred })
}

export const deleteClient = async (code: string, chb: number, idCustomer: number) => {
  return await axiosClient.delete(`${url}/${code}/${chb}/${idCustomer}`)
}

export const generateExcelOnDailyManagementService = async (date: Date, cityId: number) => {
  return await axiosClient.get(`${url}/download-excel-daily-management?date=${date}&cityId=${cityId}`, {
    responseType: 'blob',
  })
}
