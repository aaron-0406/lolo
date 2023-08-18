import { ClientType } from '../../../../shared/types/extrajudicial/client.type'
import { ProductType, ProductTypeName } from '../../../../shared/types/extrajudicial/product.type'

export type DashFormType = {
  clientsAdded: ProductTypeName[]
  clientsDeleted: ClientType[]
  productsAdded: ProductTypeName[]
  productsDeleted: ProductType[]
  productsCastigo: ProductType[]
  selected: {
    clientAddedButton: boolean
    clientDeletedButton: boolean
    productAddedButton: boolean
    productDeletedButton: boolean
    productCastigoButton: boolean
  }
}
