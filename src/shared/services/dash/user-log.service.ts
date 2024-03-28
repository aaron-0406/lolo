import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/dash/user-log`

export const getAllUserLogsByCustomerId = async (customerId: number) => {
  return await axiosClient.get(`${url}/all/${customerId}`)
}

export const getAllUserFilterLogsByCustomerId = async (
  page: number,
  limit: number,
  customerId: number,
  actions?: string,
  users?: string,
  visible: boolean = false
) => {
  let filters = ''
  filters += !!actions?.length ? `actions=${actions}&` : 'actions=[]&'
  filters += !!users?.length ? `users=${users}&` : 'users=[]&'
  return await axiosClient.get(`${url}/filter/${customerId}?${filters}page=${page}&limit=${limit}&visible=${visible}`)
}
