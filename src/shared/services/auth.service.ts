import { AxiosResponse } from 'axios'
import { LoginType } from '../types/auth.type'
import { CustomerUserType } from '../types/customer-user.type'
import axiosClient from '../utils/api/clientAxios'

const API = axiosClient.getUri()

const url = `${API}/auth`

export type LoginAPI = {
  user: CustomerUserType
  token: string
  message: string
}

export type ResponseLogin = AxiosResponse<LoginAPI, LoginAPI>

export const signin = async (login: LoginType) => {
  return await axiosClient.post(`${url}/signin`, login)
}