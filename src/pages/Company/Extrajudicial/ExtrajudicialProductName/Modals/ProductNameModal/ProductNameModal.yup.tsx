import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { ExtProductNameType } from '@/types/extrajudicial/ext-product-name'

const ModalProductName: yup.SchemaOf<Omit<ExtProductNameType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>> = yup
  .object()
  .shape({
    productName: yup.string().required().min(3).max(200),
    customerHasBankId: yup.number().required(),
  })

export const ModalProductNameResolver = yupResolver(ModalProductName)
