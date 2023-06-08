import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../shared/yupLocale'
import { CustomerUserType } from '../../../../../shared/types/customer-user.type'

const ModalUsers: yup.SchemaOf<Omit<CustomerUserType, 'createdAt' | 'id'>> = yup.object().shape({
  name: yup.string().required().min(100),
  lastName: yup.string().required().min(100),
  phone: yup.string().required().min(50),
  dni: yup.string().required().min(8),
  email: yup.string().required().min(70),
  privilege: yup.string().required().min(6),
  state: yup.boolean().required(),
  customerId: yup.number().required(),
})

export const ModalUsersResolver = yupResolver(ModalUsers)
