import { JudicialBinnacleType } from '@/types/judicial/judicial-binnacle.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/judicial/binnacle`

export const getBinnacleByFileCase = async (fileCase: number) => {
  return await axiosClient.get(`${url}/file-case/${fileCase}`)
}

export const getBinnacleById = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const createBinnacle = async (
  binnacle: Omit<JudicialBinnacleType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
) => {
  let dia = binnacle.date.split('-')
  let day = dia[0]
  let month = dia[1]
  binnacle.date = `${month}-${day}-${dia[2]}`

  return await axiosClient.post(`${url}/`, binnacle)
}

export const updateBinnacle = async (
  id: number,
  binnacle: Omit<
    JudicialBinnacleType,
    'id' | 'judicialFileCaseId' | 'customerHasBankId' | 'createdAt' | 'updatedAt' | 'deletedAt'
  >
) => {
  let dia = binnacle.date.split('-')
  let day = dia[0]
  let month = dia[1]
  binnacle.date = `${month}-${day}-${dia[2]}`
  return await axiosClient.patch(`${url}/${id}`, binnacle)
}

export const deleteBinnacle = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
