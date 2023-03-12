import { useFormContext } from "react-hook-form";
import Table from "../../../../../ui/Table";
import Column from "../../../../../ui/Table/Column";
import { DashFormType } from "../hookform.type";
import ClientAddedRow from "./ClientAddedRow";

const TableClientsAdded = () => {
  const { watch } = useFormContext<DashFormType>();

  const columns = (
    <tr>
      <Column align="left" width="5%" text="#" />
      <Column align="left" width="45%" text="Codigo Cliente" />
      <Column align="left" width="45%" text="Nombre" />
    </tr>
  );

  const rows = watch("clientsAdded").map((client, index) => {
    return (
      <ClientAddedRow
        client={client}
        key={index + client.clientCode}
        index={index}
      />
    );
  });

  return <Table columns={columns} count={rows.length} rows={rows}></Table>;
};

export default TableClientsAdded;
