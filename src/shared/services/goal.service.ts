import { GoalType } from '../types/goal-type'
import axiosClient from '../utils/api/clientAxios'
import { AxiosResponse } from 'axios'

const API = axiosClient.getUri()

const url = `${API}/goal`

export type GoalApiResponse = AxiosResponse<GoalType, GoalType>
export type GoalsApiResponse = AxiosResponse<
  { goals: Array<GoalType>; quantity: number },
  { goals: Array<GoalType>; quantity: number }
>

export const getGoals = async ({ limit, page }: { limit: number; page: number }): Promise<GoalsApiResponse> => {
  return await axiosClient.get(`${url}?limit=${limit}&page=${page}`)
}

export const createGoalService = async (
  goal: Omit<GoalType, 'id' | 'createdAt' | 'customerId' | 'endDate'>
): Promise<GoalApiResponse> => {
  let dia = goal.startDate.split('-')
  let day = dia[0]
  let month = dia[1]
  goal.startDate = `${dia[2]}-${month}-${day}`
  const startDate = `${dia[2]}-${month}-${day}`
  return await axiosClient.post(url, { ...goal, startDate: startDate })
}
export const editGoalService = async (
  goal: Omit<GoalType, 'id' | 'createdAt' | 'customerId' | 'endDate'>,
  id: number
): Promise<GoalApiResponse> => {
  let dia = goal.startDate.split('-')
  let day = dia[0]
  let month = dia[1]
  goal.startDate = `${dia[2]}-${month}-${day}`
  const startDate = `${dia[2]}-${month}-${day}`
  return await axiosClient.patch(`${url}/${id}`, { ...goal, startDate: startDate })
}
export const deleteGoalService = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
