export type GoalUserType = {
  id: number
  quantity: number
  goalId: number
  totalRealizados: number
  customerUserId: number
  customerUser: {
    id: number
    name: string
    lastName: string
    customerId: number
  }
}
