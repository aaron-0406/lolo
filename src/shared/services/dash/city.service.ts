import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/dash/city`

export const getAllCities = async (chb: number) => {
  return await axiosClient.get(`${url}/chb/${chb}`)
}
