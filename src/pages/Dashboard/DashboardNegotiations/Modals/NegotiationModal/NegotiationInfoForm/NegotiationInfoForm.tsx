import { Controller, useFormContext } from 'react-hook-form'
import { NegotiationType } from '../../../../../../shared/types/negotiation.type'
import Label from '../../../../../../ui/Label'
import TextField from '../../../../../../ui/fields/TextField'
import Container from '../../../../../../ui/Container'

const NegotiationInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<NegotiationType>()

  return (
    <>
      <Container width="100%" display="flex" gap="10px">
        <Label label="Nombre: " />
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.name} />
          )}
        />
      </Container>
    </>
  )
}

export default NegotiationInfoForm
