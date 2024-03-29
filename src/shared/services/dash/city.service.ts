import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/dash/city`

export const getAllCities = async () => {
  return await axiosClient.get(url)
}
