import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { CustomersFirmFormType } from './hookforms.interfaces'

const ModalCustomers: yup.SchemaOf<Omit<CustomersFirmFormType, 'customersfirm' | 'customerBanks' | 'createdAt' | 'id'>> = yup.object().shape({
  ruc: yup.string().required().min(11).max(11).matches(/^(10|20|15|16|17)/),
  companyName: yup.string().required().min(5),
  urlIdentifier: yup.string().required().min(5),
  description: yup.string().optional(),
  state: yup.boolean().required(),
})

export const ModalCustomersResolver = yupResolver(ModalCustomers)
