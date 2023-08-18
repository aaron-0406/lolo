import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../../shared/yupLocale'
import { ProductFormType } from './hookforms.interfaces'

const ModalProductsSchema: yup.SchemaOf<
  Omit<ProductFormType, 'id' | 'createdAt' | 'products' | 'clientCode' | 'customerId' | 'cityId' | 'funcionarioId'>
> = yup.object().shape({
  code: yup.string().required().min(5).max(150),
  name: yup.string().required().max(150),
  state: yup.string().required().max(150),
})

export const ModalProductsResolver = yupResolver(ModalProductsSchema)
