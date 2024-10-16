import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/cobranza/ext-tag-group`

export const getExtTagGroupsByCHB = async () => {
  return await axiosClient.get(`${url}/all-data-with-order`)
}
