import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { CustomerUserType } from '@/types/dash/customer-user.type'

const UsersModal: yup.SchemaOf<
  Omit<CustomerUserType, 'customerId' | 'createdAt' | 'password' | 'id' | 'permissions' | 'role'>
> = yup.object().shape({
  name: yup.string().min(3).required(),
  lastName: yup.string().min(3).required(),
  phone: yup.string().min(9).max(9).required(),
  dni: yup.string().min(8).max(8).required(),
  email: yup.string().email('No tiene un formato válido').required('Este campo es requerido'),
  state: yup.boolean().required(),
  roleId: yup.number().required(),
})

export const ModalUsersResolver = yupResolver(UsersModal)
