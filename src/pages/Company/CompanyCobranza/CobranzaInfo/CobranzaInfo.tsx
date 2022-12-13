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
      gap="20px"
      overFlowY="auto"
    >
      <div className="fields-wrapper-container-t">
        <div className="field-wrapper">
          <Label label="Código:" />
          <TextField width="100%" />
        </div>

        <div className="field-wrapper">
          <Label label="Estado:" />
          <Select width="100%" />
        </div>
      </div>

      <div className="field-wrapper">
        <Label label="Cliente:" />
        <TextAreaField width="100%" rows={2} />
      </div>

      <TextAreaField label="Perímetro venta:" width="100%" rows={1} />

      <div className="fields-wrapper-container-d">
        <div className="field-wrapper">
          <Label label="Funcionario:" />
          <Select width="100%" />
        </div>

        <div className="field-wrapper">
          <Label label="Jurisdicción:" />
          <Select width="100%" />
        </div>
      </div>

      <div className="fields-wrapper-container-t">
        <TextAreaField width="100%" label="Teléfonos 1:" rows={2} />

        <TextAreaField width="100%" label="Teléfonos 2:" rows={2} />
      </div>

      <TextAreaField width="100%" label="Teléfonos 3:" rows={2} />
    </StyledContainer>
  );
};

export default CobranzaInfo;

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    border-radius: 8px;
    border: 1px solid ${theme.colors.Neutral4};

    .fields-wrapper-container-t {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .fields-wrapper-container-d {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .field-wrapper {
      width: 100%;
      display: flex;
      gap: 15px;
    }

    @media ${theme.device.tabletS} {
      padding: 30px 40px;
    }

    @media ${theme.device.tabletL} {
      .fields-wrapper-container-t {
        flex-direction: row;
        gap: 15px;
      }
    }

    @media ${theme.device.desktopS} {
      padding: 30px 50px;
    }

    @media ${theme.device.desktopL} {
      .fields-wrapper-container-d {
        flex-direction: row;
        gap: 15px;
      }
    }
  `}
`;
