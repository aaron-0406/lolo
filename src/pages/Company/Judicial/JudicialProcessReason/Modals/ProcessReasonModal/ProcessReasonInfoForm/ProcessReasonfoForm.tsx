import { Controller, useFormContext } from 'react-hook-form'
import Label from '@/ui/Label'
import TextField from '@/ui/fields/TextField'
import Container from '@/ui/Container'
import { JudicialProcessReasonType } from '@/types/judicial/judicial-process-reason.types'

const ProcessReasonInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<JudicialProcessReasonType>()

  return (
    <>
      <Container width="100%" display="flex" gap="10px">
        <Label label="Nombre: " />
        <Controller
          name="reason"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.reason} />
          )}
        />
      </Container>
    </>
  )
}

export default ProcessReasonInfoForm
