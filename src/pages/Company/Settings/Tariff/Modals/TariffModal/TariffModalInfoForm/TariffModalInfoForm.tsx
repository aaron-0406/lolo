import { TariffType } from "@/types/config/tariff.type"
import Container from "@/ui/Container"
import TextField from "@/ui/fields/TextField"
import { Controller, useFormContext } from "react-hook-form"

const TariffModalInfoForm = () => {
  const {
    formState: { errors },
    control,
  } = useFormContext<Omit<TariffType, 'id' | 'tariffIntervalMatch'>>()

  return (
    <Container display="flex" width="100%" flexDirection="column" gap="10px" padding="20px">
      <Controller
        name="code"
        control={control}
        render={({ field }) => (
          <TextField
            width="100%"
            label="Código de la tarifa:"
            value={String(field.value)}
            onChange={(key) => {
              field.onChange(key)
            }}
            hasError={!!errors.code}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            width="100%"
            label="Descripción:"
            value={String(field.value)}
            onChange={(key) => {
              field.onChange(key)
            }}
            hasError={!!errors.code}
          />
        )}
      />
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <TextField
            width="100%"
            label="Tipo:"
            value={String(field.value)}
            onChange={(key) => {
              field.onChange(key)
            }}
            disabled={!!field.value}
            hasError={!!errors.code}
          />
        )}
      />
      <Controller
        name="value"
        control={control}
        render={({ field }) => (
          <TextField
            type="currency"
            width="100%"
            label="Costo:"
            value={field.value}
            onValueChange={(_, __, values) => {
              field.onChange(values?.value)
            }}
            decimalScale={2}
            decimalsLimit={2}
            hasError={!!errors.code}
          />
        )}
      />
    </Container>
  )
}

export default TariffModalInfoForm