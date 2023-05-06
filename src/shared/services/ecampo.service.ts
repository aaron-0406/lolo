import axiosClient from '../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/ecampo`

export const getEcampoByTemplateId = async (templateId: number) => {
  return await axiosClient.get(`${url}/${templateId}`)
}
