import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { ProductType } from '@/types/extrajudicial/product.type'

const ModalProductsSchema: yup.SchemaOf<Omit<ProductType, 'id'>> = yup.object().shape({
  code: yup.string().required().min(5).max(150),
  name: yup.string().required().max(150),
  state: yup.string().required().max(150),
  clientCode: yup.string().required().max(150),
  customerId: yup.number().required(),
})

export const ModalProductsResolver = yupResolver(ModalProductsSchema)
