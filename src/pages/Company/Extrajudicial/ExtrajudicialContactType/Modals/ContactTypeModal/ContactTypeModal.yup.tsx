import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { ExtContactTypeType } from '@/types/extrajudicial/ext-contact-type.type'

const ModalContactType: yup.SchemaOf<Omit<ExtContactTypeType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>> = yup
  .object()
  .shape({
    contactType: yup.string().required().min(3).max(200),
    customerHasBankId: yup.number().required(),
  })

export const ModalContactTypeResolver = yupResolver(ModalContactType)
