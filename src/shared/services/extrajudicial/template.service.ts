import axiosClient from '../../utils/api/clientAxios'
import { DOMAIN } from '../../utils/constant/api'
const API = axiosClient.getUri()

const url = `${API}/cobranza/template`

export const getTemplatesByCustomerId = async (idCustomer: number) => {
  return await axiosClient.get(`${url}/customer/${idCustomer}`)
}

export const getTemplatesById = async (idTemplate: number) => {
  return await axiosClient.get(`${url}/${idTemplate}`)
}

export const getTemplateJson = async (name: string) => {
  return await axiosClient.get(`${DOMAIN}/download/${name}`)
}
