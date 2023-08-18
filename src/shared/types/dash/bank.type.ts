import { CustomerHasBankType } from './../dash/customer-has-bank'

export type BankType = {
  id: number
  name: string
  description?: string
  state: boolean
  createdAt: Date
  CUSTOMER_HAS_BANK: CustomerHasBankType
}
