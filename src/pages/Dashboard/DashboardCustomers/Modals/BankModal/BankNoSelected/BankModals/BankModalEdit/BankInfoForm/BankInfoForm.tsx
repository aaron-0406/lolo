import { Controller, useFormContext } from 'react-hook-form'
import { BankType } from '../../../../../../../../../shared/types/dash/bank.type'
import Container from '../../../../../../../../../ui/Container'
import Label from '../../../../../../../../../ui/Label'
import TextField from '../../../../../../../../../ui/fields/TextField'

const BankInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<BankType>()

  return (
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
  )
}

export default BankInfoForm
