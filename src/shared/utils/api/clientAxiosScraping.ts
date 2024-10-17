import axios from 'axios'
import { API_SCRAPER } from '../constant/api'
import storage from '../storage'

const API_URL = API_SCRAPER

const clientAxiosScraping = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

clientAxiosScraping.interceptors.request.use(async (config: any) => {
  let token

  const tokenCompany = await storage.get('token')
  if (tokenCompany) {
    token = tokenCompany
  }

  const tokenDash = await storage.get('dash:token')
  if (tokenDash) {
    token = tokenDash
  }

  config.headers.Authorization = `Bearer ${token}`
  return config
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
clientAxiosScraping.interceptors.response.use(
  async (response: any) => {
    return response
  },
  async (error: any) => {
    if (error.response && error.response.status === 401) {
      if (error.response.data.message === 'El token ha expirado') {
        storage.clear()
        window.location.reload()
      }
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)   

export default clientAxiosScraping