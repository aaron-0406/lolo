import axiosClient from '../../utils/api/clientAxios'

export const getDepartments = async () => {
  return await axiosClient.get('/config/departments')  
}