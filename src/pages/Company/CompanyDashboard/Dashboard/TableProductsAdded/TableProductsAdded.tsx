import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { device } from "../../../../../shared/breakpoints/reponsive";
import { useLoloContext } from "../../../../../shared/contexts/LoloProvider";
import { useMediaQuery } from "../../../../../shared/hooks/useMediaQuery";
import { createProductsDash } from "../../../../../shared/services/dashboard.service";
import Button from "../../../../../ui/Button";
import Container from "../../../../../ui/Container";
import InputText from "../../../../../ui/inputs/InputText";
import notification from "../../../../../ui/notification";
import Table from "../../../../../ui/Table";
import Column from "../../../../../ui/Table/Column";
import { DashFormType } from "../hookform.type";
import ProductAddedRow from "./ProductAddedRow";

const TableProductsAdded = () => {
  const { watch, setValue } = useFormContext<DashFormType>();
  const [filter, setFilter] = useState("");
  const greaterThanDesktopS = useMediaQuery(device.desktopS);

  const {
    customerUser: {
      user: { id: customerUserId },
    },
    client: {
      customer: { id: customerId },
    },
    bank: {
      selectedBank: { idBank, idCHB },
    },
  } = useLoloContext();
  const handleChangeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleAddProduct = () => {
    createProducts();
  };

  const { isLoading, mutate: createProducts } = useMutation<any, Error>(
    async () => {
      const QUANTITY_DATA_SENT = 40;
      const DATA_GROUPS = Math.ceil(
        watch("productsAdded").length / QUANTITY_DATA_SENT
      );
      for (let i = 0; i < DATA_GROUPS; i++) {
        const start = i * QUANTITY_DATA_SENT;
        const end = start + QUANTITY_DATA_SENT;
        const chunk = watch("productsAdded")
          .map((item) => {
            return {
              name: item.name,
              code: item.code,
              clientName: item.clientName,
              state: item.state,
              customerId: customerId,
              clientCode: item.clientCode,
            };
          })
          .slice(start, end);
        await createProductsDash(chunk, customerUserId, +idCHB, +idBank);
      }
    },
    {
      onSuccess: () => {
        notification({ type: "success", message: "Productos Agregados" });
        setValue(
          "clientsAdded",
          watch("clientsAdded").filter(
            (item) =>
              !watch("productsAdded").some(
                (item2) => item2.clientCode === item.clientCode
              )
          )
        );
        setValue("productsAdded", []);
      },
      onError: (error: any) => {
        notification({
          type: "error",
          message: error.response.data.message,
        });
      },
    }
  );

  const columns = (
    <tr>
      <Column align="left" width="1%" text="#" />
      <Column align="left" width="10%" text="Codigo Cliente" />
      <Column align="left" width="10%" text="Nombre Cliente" />
      <Column align="left" width="10%" text="Código Producto" />
      <Column align="left" width="10%" text="Nombre Producto" />
      <Column align="left" width="10%" text="Estado" />
      <Column align="left" width="10%" text="Acciones" />
    </tr>
  );

  const rows = watch("productsAdded")
    .filter(
      (item) =>
        item.clientCode.toLowerCase().includes(filter.toLowerCase()) ||
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.code.toLowerCase().includes(filter.toLowerCase()) ||
        item.clientName.toLowerCase().includes(filter.toLowerCase())
    )
    .map((product, index) => {
      return (
        <ProductAddedRow
          product={product}
          key={index + product.code}
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
          onClick={handleAddProduct}
        />
      </Container>
      <Table columns={columns} count={rows.length} rows={rows} />
    </>
  );
};

export default TableProductsAdded;
