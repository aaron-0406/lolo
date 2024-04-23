import { ExtProductNameType } from '@/types/extrajudicial/ext-product-name'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/cobranza/ext-product-name`

export const getProductNameByID = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const getProductNameByCHB = async (chb: number, visible: boolean = false) => {
  return await axiosClient.get(`${url}/all-data-by-chb/${chb}?visible=${visible}`)
}

export const createProductName = async (
  productName: Omit<ExtProductNameType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  return await axiosClient.post(url, productName)
}

export const editProductName = async (
  productName: Omit<ExtProductNameType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  id: number
) => {
  return await axiosClient.patch(`${url}/${id}`, productName)
}

export const deleteProductName = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
