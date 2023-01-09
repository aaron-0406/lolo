import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { useLoloContext } from "../../../../shared/contexts/LoloProvider";
import { getClientByCode } from "../../../../shared/services/client.service";
import { ClientType } from "../../../../shared/types/client.type";
import Container from "../../../../ui/Container";
import TextField from "../../../../ui/fields/TextField";
import Label from "../../../../ui/Label";
import notification from "../../../../ui/notification";

type CobranzaSearchProps = {
  setLoadingGlobal: (state: boolean) => void;
};

const CobranzaSearch = ({ setLoadingGlobal }: CobranzaSearchProps) => {
  const [params] = useSearchParams();
  const codeParams = params.get("code") ?? "";

  const { setValue, reset } = useFormContext<ClientType>();

  const {
    bank: { selectedBank },
  } = useLoloContext();

  const [code, setCode] = useState<string>(codeParams);

  const { refetch } = useQuery(
    "query-get-client-by-code",
    async () => {
      return await getClientByCode(code, selectedBank.idCHB);
    },
    {
      enabled: false,
      onSuccess: (data) => {
        setValue("id", data.data.id);
        setValue("code", data.data.code);
        setValue("state", data.data.state);
        setValue("dniOrRuc", data.data.dniOrRuc);
        setValue("name", data.data.name);
        setValue("salePerimeter", data.data.salePerimeter);
        setValue("phone", data.data.phone);
        setValue("email", data.data.email);
        setValue("createdAt", data.data.createdAt);
        setValue("cityId", data.data.cityId);
        setValue("funcionarioId", data.data.funcionarioId);
        setValue("customerUserId", data.data.customerUserId);
        setValue("customerHasBankId", data.data.customerHasBankId);

        setLoadingGlobal(false);

        notification({ type: "success", message: "Cliente encontrado" });
      },
      onError: (error: any) => {
        notification({
          type: "info",
          message: error.response.data.message,
        });

        reset();
        setValue("salePerimeter", "");
        setValue("phone", "");
        setValue("email", "");

        setLoadingGlobal(false);
      },
    }
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setLoadingGlobal(true);
      refetch();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const onClickTrailing = () => {
    setLoadingGlobal(true);
    refetch();
  };

  useEffect(() => {
    if (!!codeParams.length) {
      setLoadingGlobal(true);
      refetch();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <StyledContainer
      display="flex"
      flexDirection="column"
      backgroundColor="#eff0f6ff"
      padding="15px"
      gap="15px"
    >
      <Container display="flex" gap="15px">
        <Label label="Buscar:" />
        <TextField
          width="100%"
          placeholder="Código o RUC"
          trailingIcon="ri-search-line"
          defaultValue={code}
          onKeyDown={onKeyDown}
          onChange={onChange}
          onClickTrailing={onClickTrailing}
        />
      </Container>
    </StyledContainer>
  );
};

export default CobranzaSearch;

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    border-radius: 8px;
    border: 1px solid ${theme.colors.Neutral4};

    @media ${theme.device.tabletS} {
      padding: 15px 40px;
    }

    @media ${theme.device.tabletL} {
    }

    @media ${theme.device.desktopS} {
      padding: 15px 50px;
    }
  `}
`;
