import { CompareExcelsUserType, CompareResponse } from '@/types/config/compare-excels.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()
const url = `${API}/config/compare-excels`

export const compareExcelsFiles = async (prevFile: File, newFile: File) => {
  const formData = new FormData()
  formData.append('prevFile', prevFile, prevFile.name)
  formData.append('newFile', newFile, newFile.name)
  return await axiosClient.post(`${url}/compare`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType : "json"
  })
}

export const sendReportByEmail = async (fileData: CompareResponse, users: CompareExcelsUserType[]) => { 
  return await axiosClient.post(`${url}/send-report-by-email`, { fileData, users })
}