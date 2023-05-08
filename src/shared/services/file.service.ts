import axiosClient from '../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/file`

export const postCreateFile = async (formData: FormData, idCustomer: number, chb: number, code: number, id: number) => {
  return await axiosClient.post(`${url}/${idCustomer}/${chb}/${code}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
export const getFiles = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const deleteFile = async (idCustomer: number, chb: number, code: number, id: number) => {
  return await axiosClient.delete(`${url}/${idCustomer}/${chb}/${code}/${id}`)
}

export const getFileById = async (idCustomer: number, chb: number, code: number, id: number) => {
  return await axiosClient.get(`${url}/single/${idCustomer}/${chb}/${code}/${id}`)
}
