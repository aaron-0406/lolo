import { ProductType } from '@/types/extrajudicial/product.type'

export type ProductFormType = ProductType & {
  products: Array<Omit<ProductType, 'cityId' | 'funcionarioId'>>
}
