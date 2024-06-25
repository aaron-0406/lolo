import axiosClient from '../../utils/api/clientAxios'

export const getDistricts = async () => {
  return await axiosClient.get(`/config/districts`)  
}

export const getDistrictsByProvince = async (provinceId: number) => {
  return await axiosClient.get(`/config/districts/${provinceId}`)
}