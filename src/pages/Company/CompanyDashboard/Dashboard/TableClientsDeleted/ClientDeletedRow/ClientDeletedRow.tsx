import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import styled, { css } from "styled-components";
import { useLoloContext } from "../../../../../../shared/contexts/LoloProvider";
import { deleteClientsDash } from "../../../../../../shared/services/dashboard.service";
import Button from "../../../../../../ui/Button";
import notification from "../../../../../../ui/notification";
import Row from "../../../../../../ui/Table/Row";
import { DashFormType } from "../../hookform.type";
import { ClientDeletedRowProps } from "./ClientDeletedRow.type";

const ClientDeletedRow: FC<ClientDeletedRowProps> = (props) => {
  const {
    client: { code, name },
    index,
  } = props;
  const { setValue, watch } = useFormContext<DashFormType>();
  const {
    bank: {
      selectedBank: { idBank, idCHB },
    },
  } = useLoloContext();

  const handleDeleteClient = () => {
    deleteClient();
  };

  const { isLoading, mutate: deleteClient } = useMutation<any, Error>(
    async () => {
      return await deleteClientsDash([code], +idCHB, +idBank);
    },
    {
      onSuccess: () => {
        setValue(
          "clientsDeleted",
          watch("clientsDeleted").filter((item) => item.code !== code)
        );
        notification({ type: "success", message: "Cliente Eliminado" });
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
      <Row>{code}</Row>
      <Row>{name}</Row>
      <Row>
        <Button
          display="danger"
          shape="round"
          onClick={handleDeleteClient}
          disabled={isLoading}
          loading={isLoading}
          trailingIcon="ri-close-line"
        />
      </Row>
    </StyledTr>
  );
};

export default ClientDeletedRow;

const StyledTr = styled.tr<{ index: number }>`
  ${({ theme, index }) => css`
    background-color: ${index % 2 === 0 ? `${theme.colors.Neutral3}` : `#fff`};
    :hover {
      background-color: ${theme.colors.Neutral4};
    }
  `}
`;
