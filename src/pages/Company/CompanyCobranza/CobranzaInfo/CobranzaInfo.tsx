import { Controller, useFormContext } from "react-hook-form";
import styled, { css } from "styled-components";
import { useLoloContext } from "../../../../shared/contexts/LoloProvider";
import { ClientType } from "../../../../shared/types/client.type";
import Container from "../../../../ui/Container";
import TextAreaField from "../../../../ui/fields/TextAreaField";
import TextField from "../../../../ui/fields/TextField";
import Label from "../../../../ui/Label";
import Select from "../../../../ui/Select";
import { SelectItemType } from "../../../../ui/Select/interfaces";
import CobranzaInfoModals from "./CobranzaInfoModals";

type CobranzaInfoProps = {
  loading: boolean;
};

const CobranzaInfo = ({ loading }: CobranzaInfoProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ClientType>();

  const {
    city: { cities },
    user: { users },
    funcionario: { funcionarios },
  } = useLoloContext();

  const optionsCities: Array<SelectItemType> = cities.map((city) => {
    return {
      key: String(city.id),
      label: city.name,
    };
  });

  const optionsUsers: Array<SelectItemType> = users.map((user) => {
    return {
      key: String(user.id),
      label: user.name,
    };
  });

  const optionsFuncionarios: Array<SelectItemType> = funcionarios.map(
    (funcionario) => {
      return {
        key: String(funcionario.id),
        label: funcionario.name,
      };
    }
  );

  const optionsStates: Array<SelectItemType> = [
    { key: "ASIGNADO", label: "ASIGNADO" },
    { key: "RETIRADO", label: "RETIRADO" },
  ];

  if (loading) {
    return <div>Loading ...</div>;
  }

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
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <TextField
                width="100%"
                value={field.value}
                onChange={field.onChange}
                hasError={!!errors.code}
              />
            )}
          />
        </div>

        <div className="field-wrapper">
          <Label label="Estado:" />

          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Select
                width="100%"
                value={field.value}
                options={optionsStates}
                onChange={(key) => {
                  field.onChange(key);
                }}
                hasError={!!errors.state}
              />
            )}
          />
        </div>
      </div>

      <div className="field-wrapper">
        <Label label="DNI o RUC:" />
        <Controller
          name="dniOrRuc"
          control={control}
          render={({ field }) => (
            <TextField
              width="calc(100% - 98px)"
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.dniOrRuc}
            />
          )}
        />
      </div>

      <div className="field-wrapper">
        <Label label="Cliente:" />
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextAreaField
              width="100%"
              rows={2}
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.name}
            />
          )}
        />
      </div>

      <div className="fields-wrapper-container-d">
        <Controller
          name="salePerimeter"
          control={control}
          render={({ field }) => (
            <TextAreaField
              label="Perímetro venta:"
              width="100%"
              rows={1}
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.salePerimeter}
            />
          )}
        />

        <Controller
          name="customerUserId"
          control={control}
          render={({ field }) => (
            <Select
              label="Gestor:"
              width="100%"
              value={String(field.value)}
              options={optionsUsers}
              onChange={(key) => {
                field.onChange(parseInt(key));
              }}
              hasError={!!errors.customerUserId}
            />
          )}
        />
      </div>

      <div className="fields-wrapper-container-d">
        <div className="field-wrapper">
          <Label label="Funcionario:" />
          <Controller
            name="funcionarioId"
            control={control}
            render={({ field }) => (
              <Select
                width="100%"
                value={String(field.value)}
                options={optionsFuncionarios}
                onChange={(key) => {
                  field.onChange(parseInt(key));
                }}
                hasError={!!errors.funcionarioId}
              />
            )}
          />
        </div>

        <div className="field-wrapper">
          <Label label="Jurisdicción:" />
          <Controller
            name="cityId"
            control={control}
            render={({ field }) => (
              <Select
                width="100%"
                value={String(field.value)}
                options={optionsCities}
                onChange={(key) => {
                  field.onChange(parseInt(key));
                }}
                hasError={!!errors.cityId}
              />
            )}
          />
        </div>
      </div>

      <div className="fields-wrapper-container-t">
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextAreaField
              width="100%"
              label="Teléfonos:"
              rows={2}
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.phone}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextAreaField
              width="100%"
              label="Email:"
              rows={2}
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.email}
            />
          )}
        />
      </div>

      <CobranzaInfoModals />
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
