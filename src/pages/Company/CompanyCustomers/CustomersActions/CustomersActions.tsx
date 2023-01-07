import { useState } from "react";
import styled, { css } from "styled-components";
import { useLoloContext } from "../../../../shared/contexts/LoloProvider";
import Container from "../../../../ui/Container";
import TextField from "../../../../ui/fields/TextField";
import Select from "../../../../ui/Select";
import { SelectItemType } from "../../../../ui/Select/interfaces";

const CustomersActions = () => {
  const {
    client: { customer },
  } = useLoloContext();

  const {
    bank: { selectedBank, setSelectedBank },
  } = useLoloContext();

  const options: Array<SelectItemType> = customer.customerBanks.map((bank) => {
    return {
      key: String(bank.id),
      label: bank.name,
    };
  });

  const onChangeBank = (key: string) => {
    setSelectedBank(key);
  };

  return (
    <StyledContainer
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="20px"
      gap="20px"
    >
      <Container className="actions__textfield" width="100%">
        <TextField width="100%" label="Buscar cliente:" />
      </Container>

      <Container className="actions__select" width="100%">
        <Select
          width="100%"
          label="Seleccionar banco:"
          value={selectedBank}
          options={options}
          onChange={onChangeBank}
        />
      </Container>
    </StyledContainer>
  );
};

export default CustomersActions;

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    @media ${theme.device.tabletS} {
      flex-direction: row;

      .actions__textfield .actions_select {
        width: 50%;
      }
    }

    @media ${theme.device.tabletL} {
      .actions__textfield {
        width: 60%;
      }

      .actions__select {
        width: 40%;
      }
    }

    @media ${theme.device.desktopS} {
      .actions__textfield {
        width: 70%;
      }

      .actions__select {
        width: 30%;
      }
    }
  `}
`;
