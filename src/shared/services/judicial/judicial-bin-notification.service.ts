import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/judicial/bin-notification`

export const getAllNotificationsByBinnacleId = async (binnacleId: number) => {
  return await axiosClient.get(`${url}/${binnacleId}`)
}