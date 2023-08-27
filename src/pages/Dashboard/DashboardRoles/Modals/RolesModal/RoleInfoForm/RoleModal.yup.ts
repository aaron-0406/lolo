import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { RoleType } from '@/types/dash/role.type'

const RoleModal: yup.SchemaOf<Omit<RoleType, 'id'>> = yup.object().shape({
  name: yup.string().min(1).max(150).required(),
  customerId: yup.number().min(1).required(),
  permissions: yup.array().of(yup.number()).optional(),
})

export const ModalRoleResolver = yupResolver(RoleModal)
