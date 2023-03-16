import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import styled, { css } from "styled-components";
import { useLoloContext } from "../../../../../../shared/contexts/LoloProvider";
import { createClientsDash } from "../../../../../../shared/services/dashboard.service";
import Button from "../../../../../../ui/Button";
import notification from "../../../../../../ui/notification";
import Row from "../../../../../../ui/Table/Row";
import { DashFormType } from "../../hookform.type";
import { ClientAddedRowProps } from "./ClientAddedRow.type";

const ClientAddedRow: FC<ClientAddedRowProps> = (props) => {
  const {
    client: { clientCode, clientName, code },
    index,
  } = props;
  const {
    customerUser: {
      user: { id: customerUserId },
    },
    bank: {
      selectedBank: { idBank, idCHB },
    },
  } = useLoloContext();
  const { setValue, watch } = useFormContext<DashFormType>();

  const handleAddProduct = () => {
    createProducts();
  };

  const { isLoading, mutate: createProducts } = useMutation<any, Error>(
    async () => {
      return await createClientsDash(
        [{ code: clientCode, name: clientName }],
        customerUserId,
        +idCHB,
        +idBank
      );
    },
    {
      onSuccess: () => {
        setValue(
          "clientsAdded",
          watch("clientsAdded").filter((item) => item.code !== code)
        );
        notification({ type: "success", message: "Cliente Agregado" });
      },
      onError: (error: any) => {
        notification({
          type: "error",
          message: error.response.data.message,
        });
      },
    }
  );
  return (
    <StyledTr index={index}>
      <Row>{index + 1}</Row>
      <Row>{clientCode}</Row>
      <Row>{clientName}</Row>
      <Row>
        <Button
          display="default"
          shape="round"
          onClick={handleAddProduct}
          disabled={isLoading}
          loading={isLoading}
          trailingIcon="ri-add-fill"
        />
      </Row>
    </StyledTr>
  );
};

export default ClientAddedRow;

const StyledTr = styled.tr<{ index: number }>`
  ${({ theme, index }) => css`
    background-color: ${index % 2 === 0 ? `${theme.colors.Neutral3}` : `#fff`};
    :hover {
      background-color: ${theme.colors.Neutral4};
    }
  `}
`;
