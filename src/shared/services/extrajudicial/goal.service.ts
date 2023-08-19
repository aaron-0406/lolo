import { GoalType } from '../../types/extrajudicial/goal.type'
import { GoalUserType } from '../../types/extrajudicial/goal-user.type'
import axiosClient from '../../utils/api/clientAxios'
import { AxiosResponse } from 'axios'

const API = axiosClient.getUri()

const url = `${API}/cobranza/goal`

export type GoalApiResponse = AxiosResponse<GoalType, GoalType>
export type GoalsApiResponse = AxiosResponse<
  { goals: Array<GoalType>; quantity: number },
  { goals: Array<GoalType>; quantity: number }
>
export type GoalCustomerUserResponse = AxiosResponse<Array<GoalUserType>, Array<GoalUserType>>

export const getGoals = async ({ limit, page }: { limit: number; page: number }): Promise<GoalsApiResponse> => {
  return await axiosClient.get(`${url}?limit=${limit}&page=${page}`)
}

export const getCustomerUserGoals = async (goalId: number): Promise<GoalCustomerUserResponse> => {
  return await axiosClient.get(`${url}/${goalId}/customer-user`)
}
export const getPersonalGoal = async (): Promise<GoalApiResponse> => {
  return await axiosClient.get(`${url}/personal-goal`)
}
export const getGlobalGoal = async (): Promise<GoalApiResponse> => {
  return await axiosClient.get(`${url}/global-goal`)
}

export const updateCustomerUserGoals = async (
  goalId: number,
  goalUsers: Array<GoalUserType>
): Promise<GoalApiResponse> => {
  return await axiosClient.put(`${url}/${goalId}/customer-user`, goalUsers)
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
