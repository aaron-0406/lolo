import { ProductType } from "../../../../../../shared/types/product.type";

export type ProductFormType = ProductType & {
  products: Array<Omit<ProductType, "cityId" | "funcionarioId">>;
};
