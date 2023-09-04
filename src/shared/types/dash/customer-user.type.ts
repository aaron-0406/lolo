export type CustomerUserType = {
  id: number
  name: string
  lastName: string
  phone: string
  dni: string
  email: string
  password: string
  privilege: string
  state: boolean
  createdAt: Date
  roleId: number
  permissions?: Array<{ code: string; link: string; icon: string }>
  customerId: number
}
