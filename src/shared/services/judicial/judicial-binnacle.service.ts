import { JudicialBinnacleType } from '@/types/judicial/judicial-binnacle.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/judicial/binnacle`

export const getBinnacleByFileCase = async (fileCase: number, sortingOptions:{
  sortBy: string
  order: 'ASC' | 'DESC'
}) => {
  let filters = ''
  filters += !!sortingOptions ? `sortBy=${sortingOptions.sortBy}&order=${sortingOptions.order}&` : ''
  return await axiosClient.get(`${url}/file-case/${fileCase}?${filters}`)
}

export const getBinnacleById = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const createBinnacle = async (
  binnacle: Omit<JudicialBinnacleType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> & { files: File[] },
  idCustomer: number,
  code: string
) => {
  let dia = binnacle.date.split('-')
  let day = dia[0]
  let month = dia[1]
  binnacle.date = `${month}-${day}-${dia[2]}`

  const formData = new FormData()
  formData.append('lastPerformed', binnacle.lastPerformed)
  formData.append('binnacleTypeId', binnacle.binnacleTypeId + '')
  formData.append('date', binnacle.date)
  formData.append('judicialFileCaseId', binnacle.judicialFileCaseId + '')
  formData.append('customerHasBankId', binnacle.customerHasBankId + '')
  formData.append('judicialBinProceduralStageId', binnacle.judicialBinProceduralStageId + '')
  binnacle.files.forEach((file) => {
    formData.append('file', file)
  })

  return await axiosClient.post(`${url}/${idCustomer}/${code}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const updateBinnacle = async (
  id: number,
  binnacle: Omit<
    JudicialBinnacleType,
    'id' | 'judicialFileCaseId' | 'customerHasBankId' | 'createdAt' | 'updatedAt' | 'deletedAt'
  > & { files: File[] },
  idCustomer: number,
  code: string
) => {
  let dia = binnacle.date.split('-')
  let day = dia[0]
  let month = dia[1]
  binnacle.date = `${month}-${day}-${dia[2]}`

  const formData = new FormData()
  formData.append('lastPerformed', binnacle.lastPerformed)
  formData.append('binnacleTypeId', binnacle.binnacleTypeId + '')
  formData.append('date', binnacle.date)
  formData.append('judicialBinProceduralStageId', binnacle.judicialBinProceduralStageId + '')
  binnacle.files.forEach((file) => {
    formData.append('file', file)
  })

  return await axiosClient.patch(`${url}/${id}/${idCustomer}/${code}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const deleteBinnacle = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
