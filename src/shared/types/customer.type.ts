import { BankType } from './bank.type'

export type CustomerType = {
  id: number
  ruc: string
  companyName: string
  urlIdentifier: string
  description?: string
  state: boolean
  createdAt?: Date
  customerBanks: Array<BankType>
}
