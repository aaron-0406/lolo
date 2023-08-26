import { GuarantorType } from '@/types/extrajudicial/guarantor.type'

export type GuarantorFormType = GuarantorType & {
  guarantors: Array<GuarantorType>
}
