import axiosClient from '../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/funcionario`

export const getAllFuncionariosByCHB = async (chb: string) => {
  return await axiosClient.get(`${url}/all/${chb}`)
}
