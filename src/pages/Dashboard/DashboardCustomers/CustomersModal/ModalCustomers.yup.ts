import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../shared/yupLocale'
import { CustomerType } from '../../../../shared/types/customer.type'

const ModalCustomers: yup.SchemaOf<Omit<CustomerType, 'customerBanks' | 'createdAt' | 'id'>> = yup.object().shape({
  ruc: yup
    .string()
    .required()
    .min(11)
    .max(11)
    .matches(/^(10|20|15|16|17)/),
  companyName: yup.string().required().min(5),
  urlIdentifier: yup.string().required().min(5),
  description: yup.string().optional(),
  state: yup.boolean().required().oneOf([true]),
})

export const ModalCustomersResolver = yupResolver(ModalCustomers)
