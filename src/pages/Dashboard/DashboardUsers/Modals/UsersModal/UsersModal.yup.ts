import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../shared/yupLocale'
import { CustomerUserType } from '@/types/dash/customer-user.type'

const UsersModal: yup.SchemaOf<
  Omit<CustomerUserType, 'customerId' | 'createdAt' | 'id' | 'permissions' | 'role' | 'loginAttempts' | 'officeId'>
> = yup.object().shape({
  name: yup.string().min(3).required(),
  lastName: yup.string().min(3).required(),
  phone: yup.string().min(9).max(9).required(),
  dni: yup.string().min(8).max(8).required(),
  email: yup.string().email('No tiene un formato válido').required('Este campo es requerido'),
  password: yup
    .string()
    .min(12, 'debe contener un mínimo de doce caracteres')
    .max(70)
    .matches(/^(?=.*[0-9])/, 'Debe contener al menos un número')
    .matches(/^(?=.*[\W_])/, 'Debe contener al menos un carácter especial')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])/, 'Debe contener mínimo una letra minúscula y una mayúscula')
    .required(),
  state: yup.boolean().required(),
  roleId: yup.number().required(),
})

export const ModalUsersResolver = yupResolver(UsersModal)
