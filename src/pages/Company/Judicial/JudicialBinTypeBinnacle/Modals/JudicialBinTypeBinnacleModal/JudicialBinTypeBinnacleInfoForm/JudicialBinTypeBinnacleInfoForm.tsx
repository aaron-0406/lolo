import { JudicialBinTypeBinnacleType } from '@/types/judicial/judicial-bin-type-binnacle.type'
import TextField from '@/ui/fields/TextField'
import { Controller, useFormContext } from 'react-hook-form'

const JudicialBinTypeBinnacleInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<JudicialBinTypeBinnacleType>()
  return (
    <>
      <Controller
        name="typeBinnacle"
        control={control}
        render={({ field }) => (
          <TextField
            width="100%"
            label="Tipo de Bitacora: "
            value={field.value}
            onChange={field.onChange}
            hasError={!!errors.typeBinnacle}
          />
        )}
      />
    </>
  )
}

export default JudicialBinTypeBinnacleInfoForm
