/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import styled, { css } from "styled-components";
import { useLoloContext } from "../../../../shared/contexts/LoloProvider";
import { getAllClientsByCHBDetails } from "../../../../shared/services/client.service";
import Container from "../../../../ui/Container";
import { TemplateFormType } from "../hookforms.interfaces";
import TemplateUserRow from "./TemplateUserRow";

const TemplateUsersTable = () => {
  const {
    bank: { selectedBank },
  } = useLoloContext();
  const { setValue, watch } = useFormContext<TemplateFormType>();

  const { mutate: getClients } = useMutation<any, Error>(
    async () => {
      return await getAllClientsByCHBDetails(selectedBank.idCHB);
    },
    {
      onSuccess: ({ data }) => {
        setValue("clients", data);
      },
    }
  );
  useEffect(() => {
    getClients();
    return () => {};
  }, []);

  return (
    <StyledContainer width="100%" height="49.8%">
      {watch("clients").map((client) => {
        return (
          <TemplateUserRow
            client={client}
            key={client.id + "userTableTemplate"}
          />
        );
      })}
    </StyledContainer>
  );
};

export default TemplateUsersTable;

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    border: 2px solid ${theme.colors.Neutral4};
  `}
`;
