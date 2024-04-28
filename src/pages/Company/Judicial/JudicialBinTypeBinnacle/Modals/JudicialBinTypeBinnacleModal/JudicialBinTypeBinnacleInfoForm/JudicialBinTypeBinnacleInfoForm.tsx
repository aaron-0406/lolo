import { JudicialBinTypeBinnacleType } from '@/types/judicial/judicial-bin-type-binnacle.type'
import Container from '@/ui/Container'
import Label from '@/ui/Label'
import TextField from '@/ui/fields/TextField'
import { Controller, useFormContext } from 'react-hook-form'

const JudicialBinTypeBinnacleInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<JudicialBinTypeBinnacleType>()
  return (
    <>
      <Container width="100%" display="flex" gap="10px">
        <Label label="Tipo de Bitacora: " />
        <Controller
          name="typeBinnacle"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.typeBinnacle} />
          )}
        />
      </Container>
    </>
  )
}

export default JudicialBinTypeBinnacleInfoForm
