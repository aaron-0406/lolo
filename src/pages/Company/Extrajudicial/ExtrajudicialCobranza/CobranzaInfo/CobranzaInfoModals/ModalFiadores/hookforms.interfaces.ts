import { GuarantorType } from '../../../../../../../shared/types/extrajudicial/guarantor.type'

export type GuarantorFormType = GuarantorType & {
  guarantors: Array<GuarantorType>
}
