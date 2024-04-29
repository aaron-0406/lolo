import { ProductType } from '@/types/extrajudicial/product.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/cobranza/product`

//INFO: CLIENTS SECTION
export const getProductById = async (id: number) => {
  return await axiosClient.get(`${url}/client-by-id/${id}`)
}

export const getProductsByClientId = async (clientId: number) => {
  return await axiosClient.get(`${url}/client/${clientId}`)
}

//INFO: JUDICIAL CASE FILE SECTION
export const getProductsByJudicialCaseFileId = async (judicialCaseFileId: number) => {
  return await axiosClient.get(`${url}/case-file/${judicialCaseFileId}`)
}

export const assignCaseFileToTheProducts = async (data: { productIds: string; judicialCaseFileId: number }) => {
  return await axiosClient.post(`${url}/assign-case-files`, data)
}

export const removeCaseFileOfTheProduct = async (data: { productRemovedId: number; judicialCaseFileId: number }) => {
  return await axiosClient.post(`${url}/remove-case-file`, data)
}

//INFO: DEPRECATED
export const getProductsByProductCode = async (code: string) => {
  return await axiosClient.get(`${url}/single/${code}`)
}

export const createProduct = async (product: Omit<ProductType, 'id'>) => {
  return await axiosClient.post(url, product)
}

export const editProduct = async (
  product: Omit<ProductType, 'id' | 'clientCode' | 'customerId' | 'clientId'>,
  id: number
) => {
  return await axiosClient.put(`${url}/${id}`, product)
}

export const deleteProduct = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
