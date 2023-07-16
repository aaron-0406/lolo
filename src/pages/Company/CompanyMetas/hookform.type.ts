import { GoalType } from '../../../shared/types/goal-type'
import { GoalUserType } from '../../../shared/types/goal-user.type'

export type GoalFormType = {
  goals: Array<GoalType>
  goal: GoalType
  quantity: number
  goalUsers:Array<GoalUserType>
  loading: boolean
}
