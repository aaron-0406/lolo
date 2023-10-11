import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/dash/user-log`

export const getAllUserLogsByCustomerId = async (customerId: number) => {
  return await axiosClient.get(`${url}/all/${customerId}`)
}

export const getAllUserFilterLogsByCustomerId = async (customerId: number, actions?: string, users?: string) => {
  let filters = ''
  filters += !!actions?.length ? `actions=${actions}&` : 'actions=[]&'
  filters += !!users?.length ? `users=${users}&` : 'users=[]'
  return await axiosClient.get(`${url}/filter/${customerId}?${filters}`)
}
