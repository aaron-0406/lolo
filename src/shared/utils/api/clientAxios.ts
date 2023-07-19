import axios from 'axios'
import { API } from '../constant/api'
import storage from '../storage'

const API_URL = API

const clientAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

clientAxios.interceptors.request.use(async (config: any) => {
  const token = await storage.get('token')
  // if (token) {
  // const usuario = jwtDecode<IUser>(token);
  // const secondsSinceEpoch = Math.round(Date.now() / 1000);
  // checking for time expiration of the token
  // if (secondsSinceEpoch > parseInt(usuario.exp + '')) {
  //   await localStorage.removeItem('token');
  //   window.location.href = '/';
  //   return;
  // }
  // }
  config.headers.Authorization = `Bearer ${token}`
  return config
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
clientAxios.interceptors.response.use(async (response: any) => {
  return response
})

export default clientAxios
