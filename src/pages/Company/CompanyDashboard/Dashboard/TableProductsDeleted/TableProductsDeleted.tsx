import { useFormContext } from "react-hook-form";
import Table from "../../../../../ui/Table";
import Column from "../../../../../ui/Table/Column";
import { DashFormType } from "../hookform.type";
import ProductDeletedRow from "./ProductDeletedRow";

const TableProductsDeleted = () => {
  const { watch } = useFormContext<DashFormType>();

  const columns = (
    <tr>
      <Column align="left" width="5%" text="#" />
      <Column align="left" width="31.33%" text="Codigo Cliente" />
      <Column align="left" width="31.33%" text="Código Producto" />
    </tr>
  );

  const rows = watch("productsDeleted").map((product, index) => {
    return (
      <ProductDeletedRow
        product={product}
        key={index + product.code}
        index={index}
      />
    );
  });
  return <Table columns={columns} count={rows.length} rows={rows}></Table>;
};

export default TableProductsDeleted;
