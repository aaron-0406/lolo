import { Controller, useFormContext } from 'react-hook-form'
import { FuncionarioType } from '../../../../../../shared/types/funcionario.type'
import Container from '../../../../../../ui/Container'
import Label from '../../../../../../ui/Label'
import TextField from '../../../../../../ui/fields/TextField'

const FuncionarioInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FuncionarioType>()

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

export default FuncionarioInfoForm
