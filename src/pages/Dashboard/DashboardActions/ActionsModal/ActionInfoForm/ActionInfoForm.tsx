import { Controller, useFormContext } from 'react-hook-form'
import { ManagementActionType } from '../../../../../shared/types/management-action.type'
import Container from '../../../../../ui/Container'
import Label from '../../../../../ui/Label'
import TextField from '../../../../../ui/fields/TextField'

const ActionInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ManagementActionType>()

  return (
    <>
      <Container width="100%" display="flex" gap="10px">
        <Label label="Código: " />
        <Controller
          name="codeAction"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.codeAction} />
          )}
        />
      </Container>

      <Container width="100%" display="flex" gap="10px">
        <Label label="Nombre: " />
        <Controller
          name="nameAction"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.nameAction} />
          )}
        />
      </Container>

      <Container width="100%" display="flex" gap="10px">
        <Label label="Código de subtipo: " />
        <Controller
          name="codeSubTypeManagement"
          control={control}
          render={({ field }) => (
            <TextField width="70%" value={field.value} onChange={field.onChange} hasError={!!errors.codeSubTypeManagement} />
          )}
        />
      </Container>
    </>
  )
}

export default ActionInfoForm
