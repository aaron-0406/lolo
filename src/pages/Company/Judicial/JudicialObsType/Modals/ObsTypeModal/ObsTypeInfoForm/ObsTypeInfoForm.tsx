import { Controller, useFormContext } from 'react-hook-form'
import { JudicialObsTypeType } from '@/types/judicial/judicial-obs-type.type'
import TextField from '@/ui/fields/TextField'

const ObsTypeInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<JudicialObsTypeType>()

  return (
    <>
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <TextField
            label="Tipo de Observación"
            width="100%"
            value={field.value}
            onChange={field.onChange}
            hasError={!!errors.type}
          />
        )}
      />
    </>
  )
}

export default ObsTypeInfoForm
