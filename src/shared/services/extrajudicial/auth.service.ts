import { AxiosResponse } from 'axios'
import { ChangePasswordType, LoginType } from '@/types/extrajudicial/auth.type'
import { CustomerUserType } from '@/types/dash/customer-user.type'
import axiosClient from '../../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/cobranza/auth`

export type LoginAPI = {
  user: CustomerUserType
  token: string
  message: string
}

export type ResponseLogin = AxiosResponse<LoginAPI, LoginAPI>

export const signin = async (login: LoginType) => {
  return await axiosClient.post(`${url}/signin`, login)
}

export const changePasswordService = async (data: ChangePasswordType) => {
  return await axiosClient.post(`${url}/change-password`, data)
}
