import { Controller, useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import styled, { css } from "styled-components";
import { getAllCities } from "../../../../shared/services/city.service";
import { CityType } from "../../../../shared/types/city.type";
import { ClientType } from "../../../../shared/types/client.type";
import Container from "../../../../ui/Container";
import TextAreaField from "../../../../ui/fields/TextAreaField";
import TextField from "../../../../ui/fields/TextField";
import Label from "../../../../ui/Label";
import Select from "../../../../ui/Select";
import { SelectItemType } from "../../../../ui/Select/interfaces";

const CobranzaInfo = () => {
  const { control } = useFormContext<ClientType>();

  const { data } = useQuery("query-get-all-cities", async () => {
    return await getAllCities();
  });

  const options: Array<SelectItemType> = data
    ? data.data.map((city: CityType) => {
        return {
          key: city.id,
          label: city.name,
        };
      })
    : [];

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
              />
            )}
          />
        </div>

        <div className="field-wrapper">
          <Label label="Estado:" />

          <Select width="100%" />
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
            />
          )}
        />

        <Select label="Gestor:" width="100%" />
      </div>

      <div className="fields-wrapper-container-d">
        <div className="field-wrapper">
          <Label label="Funcionario:" />
          <Select width="100%" />
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
                options={options}
                onChange={(key) => {
                  field.onChange(String(key));
                }}
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
            />
          )}
        />
      </div>
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
