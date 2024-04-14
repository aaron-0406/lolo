import { Controller, useFormContext } from 'react-hook-form'
import { JudicialCourtType } from '@/types/judicial/judicial-court.type'
import Label from '@/ui/Label'
import TextField from '@/ui/fields/TextField'
import Container from '@/ui/Container'

const CourtInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<JudicialCourtType>()

  return (
    <>
      <Container width="100%" display="flex" gap="10px">
        <Label label="Nombre: " />
        <Controller
          name="court"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.court} />
          )}
        />
      </Container>
    </>
  )
}

export default CourtInfoForm
