import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/judicial/bin-file`

export const getBinnacleByFileCase = async (fileCase: number) => {
  return await axiosClient.get(`${url}/file-case/${fileCase}`)
}

export const deleteJudicialBinFile = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}

export const getJudicialBinFileById = async (idCustomer: number, chb: number, id: number) => {
  return await axiosClient.get(`${url}/single/${idCustomer}/${chb}/${id}`)
}
