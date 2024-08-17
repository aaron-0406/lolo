import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/config/tariff`

export const getTariff = async () => {
  return await axiosClient.get(`${url}/`)
}