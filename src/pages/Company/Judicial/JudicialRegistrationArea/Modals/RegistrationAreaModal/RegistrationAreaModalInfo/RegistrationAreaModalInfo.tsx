import Container from "@/ui/Container"
import { useFormContext, Controller } from "react-hook-form"
import { JudicialRegistrationAreaType } from "@/types/judicial/judicial-registration-area.type" 
import TextField from "@/ui/fields/TextField"

const RegistrationAreaModalInfo = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<JudicialRegistrationAreaType>()
  return (
    <Container display="flex" flexDirection="column" gap="20px" width="100%" justifyContent="center" padding="20px">
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            label="Zona Registral"
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

export default RegistrationAreaModalInfo