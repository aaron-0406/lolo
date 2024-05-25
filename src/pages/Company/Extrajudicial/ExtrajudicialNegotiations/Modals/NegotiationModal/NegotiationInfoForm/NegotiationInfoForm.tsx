import { Controller, useFormContext } from 'react-hook-form'
import { NegotiationType } from '@/types/extrajudicial/negotiation.type'
import TextField from '@/ui/fields/TextField'
import Container from '@/ui/Container'

const NegotiationInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<NegotiationType>()

  return (
    <>
      <Container width="100%" display="flex" gap="10px">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              label="Nombre"
              width="100%"
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.name}
            />
          )}
        />
      </Container>
    </>
  )
}

export default NegotiationInfoForm
