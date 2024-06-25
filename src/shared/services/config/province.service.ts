import axiosClient from '../../utils/api/clientAxios'

export const getProvinces = async () => {
  return await axiosClient.get('/config/provinces')
}

export const getProvincesByDepartment = async (departmentId: number) => {
  return await axiosClient.get(`/config/provinces/${departmentId}`)
}