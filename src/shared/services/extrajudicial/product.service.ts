import { ProductType } from '../../types/extrajudicial/product.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/cobranza/product`

export const getProductsByClientCode = async (code: string) => {
  return await axiosClient.get(`${url}/client/${code}`)
}

export const getProductsByProductCode = async (code: string) => {
  return await axiosClient.get(`${url}/single/${code}`)
}

export const createProduct = async (product: Omit<ProductType, 'id'>) => {
  return await axiosClient.post(url, product)
}

export const editProduct = async (
  product: Omit<ProductType, 'id' | 'clientCode' | 'code' | 'customerId'>,
  id: number
) => {
  return await axiosClient.put(`${url}/${id}`, product)
}

export const deleteProduct = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
