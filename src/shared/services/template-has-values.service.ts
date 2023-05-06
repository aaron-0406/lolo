import { ValueType } from '../types/value.type'
import axiosClient from '../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/template-has-values`

export const getTemplateHasValuesByTemplateId = async (idTemplate: number) => {
  return await axiosClient.get(`${url}/${idTemplate}`)
}
export const getTemplatesHasValuesByCustomerId = async (idCustomer: number) => {
  return await axiosClient.get(`${url}/customer/${idCustomer}`)
}

export const createTemplateHasValuesService = async (
  {
    templateId,
    name,
  }: {
    templateId: number
    name: string
  },
  values: ValueType[]
) => {
  return await axiosClient.post(`${url}`, { templateId, name, values })
}

export const deleteTemplateHasValuesService = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
export const updateTemplateHasValuesService = async (id: number, data: any) => {
  return await axiosClient.put(`${url}/${id}`, data)
}
