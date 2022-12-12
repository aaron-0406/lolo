import styled from "styled-components";
import Button from "../../../ui/Button";
import Container from "../../../ui/Container";
import TextAreaField from "../../../ui/fields/TextAreaField";
import TextField from "../../../ui/fields/TextField";
import Icon from "../../../ui/Icon";
import Label from "../../../ui/Label";
import Select from "../../../ui/Select";

const LayoutCobranza = () => {
  return (
    <StyledContainer width="100%" height="100%" padding="15px">
      <Container
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        gap="20px"
      >
        <Container
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
            />
          </Container>
        </Container>

        <Container
          width="100%"
          height="68px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          overFlowX="auto"
          gap="10px"
        >
          <Button width="100px" title="Agregar" />
          <Button width="100px" title="Actualizar" />
          <Icon size={32} remixClass="ri-delete-bin-line" color="Warning5" />
        </Container>

        <Container
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
        </Container>
      </Container>

      <Container className="hide-component" width="100px">
        GESTION
      </Container>
    </StyledContainer>
  );
};

export default LayoutCobranza;

const StyledContainer = styled(Container)`
  z-index: 5;
`;
