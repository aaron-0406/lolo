export type PermissionType = {
  id: number
  name: string
  icon: string
  code: string
  link: string
  permissions?: Array<PermissionType>
}
