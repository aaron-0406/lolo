import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import styled, { css } from "styled-components";
import { getGuarantorsByClientID } from "../../../../../../../shared/services/guarantor.service";
import { GuarantorType } from "../../../../../../../shared/types/guarantor.type";
import Container from "../../../../../../../ui/Container";
import { GuarantorFormType } from "../hookforms.interfaces";
import ModalFiadoresRow from "./ModalFiadoresRow";

const ModalFiadoresTable = () => {
  const { getValues, setValue, watch } = useFormContext<GuarantorFormType>();

  const clientId = getValues("clientId");
  const fiadores = watch("guarantors");

  const { isLoading, refetch } = useQuery(
    "query-get-guarantors-by-client-id",
    async () => {
      return await getGuarantorsByClientID(clientId);
    },
    {
      enabled: false,
      onSuccess: (data) => {
        setValue("guarantors", data.data);
      },
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <StyledContainer width="100%" height="calc(100% - 350px)">
      {fiadores.map((guarantor: GuarantorType, index: number) => {
        return (
          <ModalFiadoresRow
            key={index}
            id={index + 1}
            guarantorId={guarantor.id}
            name={guarantor.name}
          />
        );
      })}
    </StyledContainer>
  );
};

export default ModalFiadoresTable;

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    border-radius: 8px;
    border: 2px solid ${theme.colors.Neutral4};
  `}
`;
