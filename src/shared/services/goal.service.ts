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

export const createGoalService = async (goal: Omit<GoalType, 'id'>): Promise<GoalApiResponse> => {
  return await axiosClient.post(url, goal)
}
export const editGoalService = async (goal: Omit<GoalType, 'id' | 'endDate'>, id: number): Promise<GoalApiResponse> => {
  return await axiosClient.patch(`${url}/${id}`, goal)
}
export const deleteGoal = async (id: number) => {
  return await axiosClient.delete(`${url}/${id}`)
}
