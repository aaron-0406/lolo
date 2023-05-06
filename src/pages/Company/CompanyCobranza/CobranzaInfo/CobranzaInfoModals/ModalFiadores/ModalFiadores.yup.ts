import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { GuarantorFormType } from './hookforms.interfaces'

const ModalFiadoresSchema: yup.SchemaOf<Omit<GuarantorFormType, 'id' | 'createdAt' | 'guarantors'>> = yup
  .object()
  .shape({
    name: yup.string().required().min(5).max(150),
    phone: yup.string().optional(),
    email: yup.string().optional(),
    clientId: yup.number().required().min(1),
  })

export const ModalFiadoresResolver = yupResolver(ModalFiadoresSchema)
