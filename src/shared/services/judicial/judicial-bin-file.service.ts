import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/judicial/bin-file`

export const getBinnacleByFileCase = async (fileCase: number) => {
  return await axiosClient.get(`${url}/file-case/${fileCase}`)
}

export const deleteJudicialBinFile = async (
  id: number,
  idCustomer: number,
  chb: number,
  code: string,
  judicialFileCaseId: number
) => {
  return await axiosClient.delete(`${url}/${idCustomer}/${chb}/${code}/${judicialFileCaseId}/${id}`)
}

export const getJudicialBinFileById = async (
  idCustomer: number,
  code: string,
  chb: number,
  judicialFileCaseId: number,
  id: number
) => {
  return await axiosClient.get(`${url}/single/${idCustomer}/${code}/${chb}/${judicialFileCaseId}/${id}`)
}
