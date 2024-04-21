import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/dash/city`

export const getAllCities = async (customerId: number) => {
  return await axiosClient.get(`${url}/customer/${customerId}`)
}
