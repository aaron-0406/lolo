import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/dash/customer-bank`

//TODO: validate if we use this
export const getAllBanks = async (idCustomer: number, idBank: number) => {
  return await axiosClient.get(`${url}/${idCustomer}/${idBank}`)
}
