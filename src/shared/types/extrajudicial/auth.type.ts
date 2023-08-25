export type LoginType = {
  email: string
  password: string
  customerId: number
}

export type ChangePasswordType = {
  newPassword: string
  repeatPassword: string
}

export type ChangeCredentialType = {
  name: string
  lastname: string
  dni: string
  phone: string
}
