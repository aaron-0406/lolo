import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import Container from "../../../../ui/Container";
import TextField from "../../../../ui/fields/TextField";
import Label from "../../../../ui/Label";

const CobranzaSearch = () => {
  const [params] = useSearchParams();

  const code = params.get("code") ?? "";

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
