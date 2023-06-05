import axiosClient from '../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/management-action`

export const getAllManagementActionsByCHB = async (chb: string) => {
  return await axiosClient.get(`${url}/all/${chb}`)
}
