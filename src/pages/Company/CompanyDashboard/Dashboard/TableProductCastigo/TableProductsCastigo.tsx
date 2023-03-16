import { useFormContext } from "react-hook-form";
import Table from "../../../../../ui/Table";
import Column from "../../../../../ui/Table/Column";
import { DashFormType } from "../hookform.type";
import ProductCastigoRow from "./ProductCastigoRow";

const TableProductsCastigo = () => {
  const { watch } = useFormContext<DashFormType>();

  const columns = (
    <tr>
      <Column align="left" width="5%" text="#" />
      <Column align="left" width="31.5%" text="Codigo Cliente" />
      <Column align="left" width="31.5%" text="Código Producto" />
      <Column align="left" width="31.5%" text="Nombre Producto" />
      <Column align="left" width="31.5%" text="Estado" />
    </tr>
  );

  const rows = watch("productsCastigo").map((product, index) => {
    return (
      <ProductCastigoRow
        product={product}
        key={index + product.clientCode}
        index={index}
      />
    );
  });

  return <Table columns={columns} count={rows.length} rows={rows}></Table>;
};

export default TableProductsCastigo;
