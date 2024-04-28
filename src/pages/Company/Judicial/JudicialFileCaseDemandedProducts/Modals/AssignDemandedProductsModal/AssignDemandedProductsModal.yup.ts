import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'

const ModalDemandedProductsSchema = yup.object({
  products: yup.array().of(yup.number().required()).min(1, 'Al menos un producto debe ser asignado'),
})

export const ModalDemandedProductsResolver = yupResolver(ModalDemandedProductsSchema)
