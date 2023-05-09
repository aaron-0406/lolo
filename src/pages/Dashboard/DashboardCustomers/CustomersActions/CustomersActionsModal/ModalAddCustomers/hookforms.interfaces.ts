import { CustomerType } from '../../../../../../shared/types/customer.type'

export type CustomersFirmFormType = CustomerType & {
  customersfirm: Array<CustomerType>
}
