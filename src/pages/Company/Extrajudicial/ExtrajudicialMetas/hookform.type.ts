import { GoalUserType } from '../../../../shared/types/extrajudicial/goal-user.type'
import { GoalType } from '../../../../shared/types/extrajudicial/goal.type'

export type GoalFormType = {
  goals: Array<GoalType>
  goal: GoalType
  quantity: number
  goalUsers: Array<GoalUserType>
  loading: boolean
}
