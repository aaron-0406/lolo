import { JudicialObservationType } from '@/types/judicial/judicial-observation.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/judicial/observation`

export const getObservationByFileCase = async (fileCase: number, visible: boolean = false) => {
  return await axiosClient.get(`${url}/file-case/${fileCase}?visible=${visible}`)
}

export const getObservationById = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const createObservation = async (
  observation: Omit<JudicialObservationType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> & { files: File[] },
  idCustomer: number,
  code: string
) => {
  let dia = observation.date.split('-')
  let day = dia[0]
  let month = dia[1]
  observation.date = `${month}-${day}-${dia[2]}`

  const formData = new FormData()
  formData.append('date', observation.date)
  formData.append('comment', observation.comment)
  formData.append('judicialCaseFileId', observation.judicialCaseFileId + '')
  formData.append('judicialObsTypeId', observation.judicialObsTypeId + '')
  formData.append('customerHasBankId', observation.customerHasBankId + '')
  observation.files.forEach((file) => {
    formData.append('file', file)
  })

  return await axiosClient.post(`${url}/${idCustomer}/${code}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const updateObservation = async (
  id: number,
  observation: Omit<
    JudicialObservationType,
    'id' | 'judicialCaseFileId' | 'customerHasBankId' | 'createdAt' | 'updatedAt' | 'deletedAt'
  > & { files: File[] },
  idCustomer: number,
  code: string
) => {
  let dia = observation.date.split('-')
  let day = dia[0]
  let month = dia[1]
  observation.date = `${month}-${day}-${dia[2]}`

  const formData = new FormData()
  formData.append('comment', observation.comment)
  formData.append('judicialObsTypeId', observation.judicialObsTypeId + '')
  formData.append('date', observation.date)
  observation.files.forEach((file) => {
    formData.append('file', file)
  })

  return await axiosClient.patch(`${url}/${id}/${idCustomer}/${code}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const deleteObservation = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
