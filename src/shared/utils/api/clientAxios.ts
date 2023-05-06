import axios from 'axios'
import { API } from '../constant/api'

const API_URL = API

const clientAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

export default clientAxios
