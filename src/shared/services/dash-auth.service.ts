import { LoginType } from '../types/dash-auth.type'
import axiosClient from '../utils/api/clientAxios'
import { AxiosResponse } from 'axios'
import { UserAppType } from '../types/user-app'

const API = axiosClient.getUri()

const url = `${API}/dash/auth`

export type LoginAPI = {
  user: UserAppType
  token: string
  message: string
}

export type ResponseLogin = AxiosResponse<LoginAPI, LoginAPI>

export const signin = async (login: LoginType) => {
  return await axiosClient.post(`${url}/signin`, login)
}
