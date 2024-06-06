import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()
const url = `${API}/config/compare-excels`

export const compareExcelsFiles = async (prevFile: File, newFile: File) => {
  const formData = new FormData()
  formData.append('prevFile', prevFile)
  formData.append('newFile', newFile)
  return await axiosClient.post(`${url}/compare`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}