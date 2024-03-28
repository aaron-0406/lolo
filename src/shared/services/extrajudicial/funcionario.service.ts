import axiosClient from '../../utils/api/clientAxios'
import { FuncionarioType } from '@/types/extrajudicial/funcionario.type'

const API = axiosClient.getUri()

const url = `${API}/dash/funcionario`

export const getAllFuncionarios = async () => {
  return await axiosClient.get(`${url}/all/`)
}

export const getAllFuncionariosByCHB = async (chb: number, visible: boolean = false) => {
  return await axiosClient.get(`${url}/all/${chb}?visible=${visible}`)
}

export const getAllFuncionariosByID = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const createFuncionario = async (funcionario: Omit<FuncionarioType, 'id' | 'createdAt'>) => {
  return await axiosClient.post(`${url}/`, funcionario)
}

export const editFuncionarioById = async (id: number, funcionario: Omit<FuncionarioType, 'id' | 'createdAt'>) => {
  return await axiosClient.put(`${url}/${id}`, funcionario)
}

export const deleteFuncionario = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
