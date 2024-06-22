import Container from "@/ui/Container"
import { useFormContext, Controller } from "react-hook-form"
import { JudicialUseOfPropertyType } from "@/types/judicial/judicial-use-of-property.type"
import TextField from "@/ui/fields/TextField"

const UseOfPropertyModalInfo = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<JudicialUseOfPropertyType>()
  return (
    <Container display="flex" flexDirection="column" gap="20px" width="100%" justifyContent="center" padding="20px">
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            label="Uso de propiedad"
            width="100%"
            value={field.value}
            onChange={field.onChange}
            hasError={!!errors.name}
          />
        )}
      />
    </Container>
  )
}

export default UseOfPropertyModalInfo