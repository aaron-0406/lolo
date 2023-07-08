import { GoalType } from '../../../shared/types/goal-type'

export type GoalFormType = {
  goals: Array<GoalType>
  goal: GoalType
  quantity: number
  loading: boolean
}
