import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { ProductType } from '@/types/extrajudicial/product.type'

const ModalProductsSchema: yup.SchemaOf<Omit<ProductType, 'id'>> = yup.object().shape({
  code: yup.string().required().min(5).max(150),
  state: yup.string().required().max(150),
  clientId: yup.number().required(),
  customerId: yup.number().required(),
  negotiationId: yup.number().required().min(1),
  extProductNameId: yup.number().required().min(1),
  customerHasBankId: yup.number().required().min(1),
  judicialCaseFileId: yup.number().optional(),
})

export const ModalProductsResolver = yupResolver(ModalProductsSchema)
