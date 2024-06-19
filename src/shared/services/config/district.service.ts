import axiosClient from '../../utils/api/clientAxios'

export const getDistricts = async () => {
  return await axiosClient.get(`/config/districts`)  
}