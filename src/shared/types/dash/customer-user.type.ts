import { RoleType } from './role.type'

export type CustomerUserType = {
  id: number
  name: string
  lastName: string
  phone: string
  dni: string
  email: string
  password: string
  state: boolean
  createdAt: Date
  permissions?: Array<{
    id:string
    code: string
    link: string
    name: string
    icon: string
    idPermissionMain: string
    isDropdown: boolean
  }>
  subRoles:string; 
  customerId: number
  roleId: number
  role: RoleType
  loginAttempts?: number
  code2fa?:string
}
