import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { device } from "../../../../../shared/breakpoints/reponsive";
import { useLoloContext } from "../../../../../shared/contexts/LoloProvider";
import { useMediaQuery } from "../../../../../shared/hooks/useMediaQuery";
import { createClientsDash } from "../../../../../shared/services/dashboard.service";
import Button from "../../../../../ui/Button";
import Container from "../../../../../ui/Container";
import InputText from "../../../../../ui/inputs/InputText";
import notification from "../../../../../ui/notification";
import Table from "../../../../../ui/Table";
import Column from "../../../../../ui/Table/Column";
import { DashFormType } from "../hookform.type";
import ClientAddedRow from "./ClientAddedRow";

const TableClientsAdded = () => {
  const { watch, setValue } = useFormContext<DashFormType>();
  const [filter, setFilter] = useState("");
  const greaterThanDesktopS = useMediaQuery(device.desktopS);
  const {
    customerUser: {
      user: { id: customerUserId },
    },
    bank: {
      selectedBank: { idBank, idCHB },
    },
  } = useLoloContext();
  const columns = (
    <tr>
      <Column align="left" width="5%" text="#" />
      <Column align="left" width="45%" text="Codigo Cliente" />
      <Column align="left" width="45%" text="Nombre" />
      <Column align="left" width="45%" text="Acciones" />
    </tr>
  );
  const handleAddClient = () => {
    createClients();
  };

  const { isLoading, mutate: createClients } = useMutation<any, Error>(
    async () => {
      const QUANTITY_DATA_SENT = 40;
      const DATA_GROUPS = Math.ceil(
        watch("clientsAdded").length / QUANTITY_DATA_SENT
      );
      for (let i = 0; i < DATA_GROUPS; i++) {
        const start = i * QUANTITY_DATA_SENT;
        const end = start + QUANTITY_DATA_SENT;
        const chunk = watch("clientsAdded")
          .map((item) => {
            return {
              name: item.clientName,
              code: item.clientCode,
              funcionarioId: item.funcionarioId,
              cityId: item.cityId,
            };
          })
          .slice(start, end);
        await createClientsDash(chunk, customerUserId, +idCHB, +idBank);
      }
    },
    {
      onSuccess: () => {
        notification({ type: "success", message: "Productos Agregados" });
        setValue("clientsAdded", []);
      },
      onError: (error: any) => {
        notification({
          type: "error",
          message: error.response.data.message,
        });
      },
    }
  );

  const handleChangeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const rows = watch("clientsAdded")
    .filter(
      (item) =>
        item.clientCode.toLowerCase().includes(filter.toLowerCase()) ||
        item.clientName.toLowerCase().includes(filter.toLowerCase())
    )
    .map((client, index) => {
      return (
        <ClientAddedRow
          client={client}
          key={index + client.clientCode}
          index={index}
        />
      );
    });

  return (
    <>
      <Container
        display="flex"
        flexDirection={greaterThanDesktopS ? "row" : "column"}
        gap={greaterThanDesktopS ? "0px" : "10px"}
        width="100%"
        justifyContent="space-between"
      >
        <InputText
          placeholder="Buscar Cliente..."
          name="filter"
          onChange={handleChangeInputText}
        />
        <Button
          display="default"
          trailingIcon="ri-add-fill"
          label="Agregar Todos"
          shape="default"
          disabled={isLoading}
          loading={isLoading}
          onClick={handleAddClient}
        />
      </Container>
      <Table columns={columns} count={rows.length} rows={rows} />
    </>
  );
};

export default TableClientsAdded;
