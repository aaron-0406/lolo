import { ClientType } from "../../../../shared/types/client.type";
import {
  ProductType,
  ProductTypeName,
} from "../../../../shared/types/product.type";

export type DashFormType = {
  clientsAdded: ProductTypeName[];
  clientsDeleted: ClientType[];
  productsAdded: ProductTypeName[];
  productsDeleted: ProductType[];
  productsCastigo: ProductType[];
  selected: {
    clientAddedButton: boolean;
    clientDeletedButton: boolean;
    productAddedButton: boolean;
    productDeletedButton: boolean;
    productCastigoButton: boolean;
  };
};
