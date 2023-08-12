import axiosClient from '../utils/api/clientAxios'
import { FuncionarioType } from '../types/funcionario.type'

const API = axiosClient.getUri()

const url = `${API}/funcionario`

export const getAllFuncionarios = async () => {
  return await axiosClient.get(`${url}/all/`)
}

export const getAllFuncionariosByCHB = async (chb: number) => {
  return await axiosClient.get(`${url}/all/${chb}`)
}

export const getAllFuncionariosByID = async (id: number) => {
  return await axiosClient.get(`${url}/${id}`)
}

export const createFuncionario = async (funcionario: Omit<FuncionarioType, 'id'>) => {
  return await axiosClient.post(`${url}/`, funcionario)
}

export const editFuncionarioById = async (id: number, funcionario: Omit<FuncionarioType, 'id'>) => {
  return await axiosClient.put(`${url}/${id}`, funcionario)
}

export const deleteFuncionario = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
