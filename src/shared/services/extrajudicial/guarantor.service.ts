import { GuarantorType } from '@/types/extrajudicial/guarantor.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/cobranza/guarantor`

export const getGuarantorsByClientID = async (clientId: number, visible: boolean = false) => {
  return await axiosClient.get(`${url}/all-client/${clientId}?visible=${visible}`)
}

export const createGuarantor = async (guarantor: Omit<GuarantorType, 'id'>) => {
  return await axiosClient.post(url, guarantor)
}
export const editGuarantor = async (guarantor: Omit<GuarantorType, 'id' | 'clientId'>, id: number) => {
  return await axiosClient.patch(`${url}/${id}`, guarantor)
}
export const deleteGuarantor = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
