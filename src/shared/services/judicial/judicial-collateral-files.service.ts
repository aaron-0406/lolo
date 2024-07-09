import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri(); 
const url = `${API}/judicial/collateral-files`

export const getJudicialCollateralFilesById = async (chb:number, collateralId:number,  id: number) => {
  return await axiosClient.get(`${url}/${chb}/${collateralId}/${id}`)
}

export const getJudicialCollateralFiles = async (collateralId: number, chb: number) => {
  return await axiosClient.get(`${url}/${chb}/${collateralId}`)
}

export const createJudicialCollateralFiles = async (
  JudicialCollateralFiles: File[], 
  chb: number, 
  collateralId: number, 
) => {
  const formData = new FormData()
  JudicialCollateralFiles.forEach((file) => {
    formData.append('file', file)
  })
  return await axiosClient.post(`${url}/${chb}/${collateralId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }) 
}

export const deleteJudicialCollateralFiles = async (id: number, chb: number, collateralId: number) => {
  return await axiosClient.delete(`${url}//${chb}/${collateralId}/${id}`)
}