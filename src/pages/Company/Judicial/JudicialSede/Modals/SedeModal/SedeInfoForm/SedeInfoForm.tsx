import { Controller, useFormContext } from 'react-hook-form'
import { JudicialSedeType } from '@/types/judicial/judicial-sede.type'
import TextField from '@/ui/fields/TextField'

const SedeInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<JudicialSedeType>()

  return (
    <>
      <Controller
        name="sede"
        control={control}
        render={({ field }) => (
          <TextField
            label="Ciudad:"
            width="100%"
            value={field.value}
            onChange={field.onChange}
            hasError={!!errors.sede}
          />
        )}
      />
    </>
  )
}

export default SedeInfoForm
