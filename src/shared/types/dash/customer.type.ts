import { BankType } from '@/types/dash/bank.type'

export type CustomerType = {
  id: number
  ruc: string
  companyName: string
  urlIdentifier: string
  description?: string
  state: boolean
  createdAt?: Date
  customerBanks: Array<BankType>
  isScrapperActive: boolean;
}
