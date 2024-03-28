import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/cobranza/ext-tag-group`

export const getExtTagGroupsByCHB = async (chb: number, visible: boolean = false) => {
  return await axiosClient.get(`${url}/all-data-by-chb/${chb}?visible=${visible}`)
}
