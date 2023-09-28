import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/dash/user-log`

export const getAllUserLogsByCustomerId = async (customerId: number) => {
  return await axiosClient.get(`${url}/all/${customerId}`)
}
