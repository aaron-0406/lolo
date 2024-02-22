import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/cobranza/file`

export const postCreateFile = async (
  formData: FormData,
  idCustomer: number,
  chb: number,
  code: number,
  id: number,
  tagId: number
) => {
  return await axiosClient.post(`${url}/${idCustomer}/${chb}/${code}/${id}/${tagId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
export const getFiles = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const editFile = async (data: { originalName: string; tagId: number }, id: number) => {
  return await axiosClient.patch(`${url}/${id}`, data)
}

export const deleteFile = async (idCustomer: number, chb: number, code: number, id: number) => {
  return await axiosClient.delete(`${url}/${idCustomer}/${chb}/${code}/${id}`)
}

export const getFileById = async (idCustomer: number, chb: number, code: number, id: number) => {
  return await axiosClient.get(`${url}/single/${idCustomer}/${chb}/${code}/${id}`)
}
