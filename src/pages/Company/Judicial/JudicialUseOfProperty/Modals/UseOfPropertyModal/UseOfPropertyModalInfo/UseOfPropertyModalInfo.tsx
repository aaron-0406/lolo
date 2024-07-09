import Container from "@/ui/Container"
import { useFormContext, Controller } from "react-hook-form"
import { JudicialUseOfPropertyType } from "@/types/judicial/judicial-use-of-property.type"
import TextField from "@/ui/fields/TextField"
import { useEffect } from "react"

const UseOfPropertyModalInfo = () => {
  const {
    control,
    reset,
    formState: { errors },
  } = useFormContext<JudicialUseOfPropertyType>()

  useEffect(()=>{
    return reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <Container display="flex" flexDirection="column" gap="20px" width="100%" justifyContent="center" padding="20px">
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            label="Uso del bien"
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