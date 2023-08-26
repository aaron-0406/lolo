import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { PermissionType } from '@/types/dash/permission.type'

const PermissionModal: yup.SchemaOf<Omit<PermissionType, 'id' | 'permissions'>> = yup.object().shape({
  name: yup.string().min(1).max(150).required(),
  code: yup.string().min(1).max(150).required(),
  link: yup.string().min(1).max(150).required(),
  icon: yup.string().min(1).max(150).required(),
})

export const ModalPermissionResolver = yupResolver(PermissionModal)
