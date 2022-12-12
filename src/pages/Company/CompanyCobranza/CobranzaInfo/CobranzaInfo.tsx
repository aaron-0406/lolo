import styled, { css } from "styled-components";
import Container from "../../../../ui/Container";
import TextAreaField from "../../../../ui/fields/TextAreaField";
import TextField from "../../../../ui/fields/TextField";
import Label from "../../../../ui/Label";
import Select from "../../../../ui/Select";

const CobranzaInfo = () => {
  return (
    <StyledContainer
      width="100%"
      backgroundColor="#eff0f6ff"
      padding="15px"
      display="flex"
      flexDirection="column"
      gap="10px"
      overFlowY="auto"
    >
      <Container display="flex" gap="15px">
        <Label label="Código:" />
        <TextField width="100%" />
      </Container>

      <Container display="flex" gap="15px">
        <Label label="Estado:" />
        <TextField width="100%" />
      </Container>

      <Container display="flex" gap="15px">
        <Label label="Cliente:" />
        <TextAreaField width="100%" rows={2} />
      </Container>

      <TextAreaField label="Perímetro venta:" width="100%" rows={1} />

      <Container display="flex" gap="15px">
        <Label label="Funcionario:" />
        <Select width="100%" />
      </Container>

      <Container display="flex" gap="15px">
        <Label label="Jurisdicción:" />
        <Select width="100%" />
      </Container>

      <TextAreaField width="100%" label="Teléfonos 1:" rows={2} />

      <TextAreaField width="100%" label="Teléfonos 2:" rows={2} />

      <TextAreaField width="100%" label="Teléfonos 3:" rows={2} />
    </StyledContainer>
  );
};

export default CobranzaInfo;

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    border-radius: 8px;
    border: 1px solid ${theme.colors.Neutral4};

    @media ${theme.device.tabletS} {
      padding: 30px 40px;
    }

    @media ${theme.device.tabletL} {
    }

    @media ${theme.device.desktopS} {
    }
  `}
`;
