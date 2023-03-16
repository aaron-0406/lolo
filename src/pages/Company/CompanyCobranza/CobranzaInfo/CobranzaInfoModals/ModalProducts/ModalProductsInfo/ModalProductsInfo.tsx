import Container from "../../../../../../../ui/Container";
import Label from "../../../../../../../ui/Label";
import { Controller, useFormContext } from "react-hook-form";
import TextAreaField from "../../../../../../../ui/fields/TextAreaField";
import { ProductFormType } from "../hookforms.interfaces";
import { SelectItemType } from "../../../../../../../ui/Select/interfaces";
import Select from "../../../../../../../ui/Select";

const ModalProductsInfo = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProductFormType>();

  const optionsNames: Array<SelectItemType> = [
    { key: "ADELANTO SUELDO ATRASO", label: "ADELANTO SUELDO ATRASO" },
    { key: "AMEX LAN CLASICA", label: "AMEX LAN CLASICA" },
    { key: "AMEX LAN PLATINUM", label: "AMEX LAN PLATINUM" },
    { key: "AMEX ORO", label: "AMEX ORO" },
    { key: "AMEX ORO LAN", label: "AMEX ORO LAN" },
    { key: "AMEX VERDE", label: "AMEX VERDE" },
    { key: "CTEORD", label: "CTEORD" },
    { key: "EFECTIVO", label: "EFECTIVO" },
    { key: "EFECTIVO DSCTO. POH", label: "EFECTIVO DSCTO. POH" },
    { key: "EFECTIVO NEGOCIOS", label: "EFECTIVO NEGOCIOS" },
    { key: "GARANTIA HIPOTECARIA", label: "GARANTIA HIPOTECARIA" },
    { key: "HIPOTECARIO VIVIENDA", label: "HIPOTECARIO VIVIENDA" },
    { key: "HIPOTECARIO VIVIENDA REF", label: "HIPOTECARIO VIVIENDA REF" },
    { key: "HVIC", label: "HVIC" },
    { key: "MI VIVIENDA", label: "MI VIVIENDA" },
    { key: "NEGOCIO COMERCIAL", label: "NEGOCIO COMERCIAL" },
    { key: "REFINANCIADO LETRAS", label: "REFINANCIADO LETRAS" },
    { key: "REFINANCIADO PAGARES", label: "REFINANCIADO PAGARES" },
    { key: "REPROGRAMADO CONSUMO", label: "REPROGRAMADO CONSUMO" },
    { key: "REPROGRAMADO PYME", label: "REPROGRAMADO PYME" },
    { key: "SOLUCION NEGOCIOS", label: "SOLUCION NEGOCIOS" },
    { key: "VEHICULAR", label: "VEHICULAR" },
    { key: "VISA CLASICA", label: "VISA CLASICA" },
    { key: "VISA CLASICA LAN", label: "VISA CLASICA LAN" },
    { key: "VISA CLASICA MASIVA", label: "VISA CLASICA MASIVA" },
    { key: "VISA EXACTA", label: "VISA EXACTA" },
    { key: "VISA ORO", label: "VISA ORO" },
    { key: "VISA ORO LAN", label: "VISA ORO LAN" },
    { key: "VISA PLATINUM", label: "VISA PLATINUM" },
    { key: "VISA PLATINUM LAN", label: "VISA PLATINUM LAN" },
    { key: "VISA SIGNATURE", label: "VISA SIGNATURE" },
  ];
  const optionsStates: Array<SelectItemType> = [
    { key: "ACTIVA", label: "ACTIVA" },
    { key: "CASTIGO", label: "CASTIGO" },
  ];
  return (
    <Container width="100%" display="flex" flexDirection="column" gap="10px">
      <Container width="100%" display="flex" gap="10px">
        <Label label="Código: " />
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <TextAreaField
              width="100%"
              rows={1}
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.code}
            />
          )}
        />
      </Container>

      <Container width="100%" display="flex" gap="10px">
        <Label label="Nombre:" />

        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Select
              width="100%"
              value={String(field.value)}
              options={optionsNames}
              onChange={(key) => {
                field.onChange(key);
              }}
              hasError={!!errors.name}
            />
          )}
        />
      </Container>

      <Container width="100%" display="flex" gap="10px">
        <Label label="Estado:" />

        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <Select
              width="100%"
              value={String(field.value)}
              options={optionsStates}
              onChange={(key) => {
                field.onChange(key);
              }}
              hasError={!!errors.state}
            />
          )}
        />
      </Container>
    </Container>
  );
};

export default ModalProductsInfo;
