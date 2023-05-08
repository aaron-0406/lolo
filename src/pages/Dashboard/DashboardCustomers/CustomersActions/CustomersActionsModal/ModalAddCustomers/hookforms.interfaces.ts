import { CustomerFirmType } from '../../../../../../shared/types/customer-firm.type'

export type CustomersFirmFormType = CustomerFirmType & {
  customersfirm: Array<CustomerFirmType>
}
