import { BankType } from '../../../../../shared/types/dash/bank.type'

enum BankStatusEnum {
  SELECTED_BANK = 'SELECTED_BANK',
  BANK_NOT_SELECTED = 'BANK_NOT_SELECTED',
}

export type BankStatusType = `${BankStatusEnum}`

export type SelectedElementType = {
  bank: BankType
  key: BankStatusType
}
