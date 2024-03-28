import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { ExtAddressType } from '@/types/extrajudicial/ext-address-type.type'

const ModalAddressType: yup.SchemaOf<Omit<ExtAddressType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>> = yup
  .object()
  .shape({
    type: yup.string().required().max(200),
    customerHasBankId: yup.number().required(),
  })

export const ModalAddressTypeResolver = yupResolver(ModalAddressType)
