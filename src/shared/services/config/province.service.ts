import axiosClient from '../../utils/api/clientAxios'

export const getProvinces = async () => {
  return await axiosClient.get('/config/provinces')
}