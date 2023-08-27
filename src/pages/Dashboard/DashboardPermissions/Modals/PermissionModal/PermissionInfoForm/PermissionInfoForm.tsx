import { Controller, useFormContext } from 'react-hook-form'
import Container from '@/ui/Container/Container'
import Label from '@/ui/Label/Label'
import TextField from '@/ui/fields/TextField/TextField'
import { PermissionType } from '@/types/dash/permission.type'

const PermissionInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<Omit<PermissionType, 'permissions'>>()

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

      <Container width="100%" display="flex" gap="10px">
        <Label label="Código: " />
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.code} disabled />
          )}
        />
      </Container>

      <Container width="100%" display="flex" gap="10px">
        <Label label="Ícono: " />
        <Controller
          name="icon"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.icon} />
          )}
        />
      </Container>

      <Container width="100%" display="flex" gap="10px">
        <Label label="Link: " />
        <Controller
          name="link"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.link} />
          )}
        />
      </Container>
    </>
  )
}

export default PermissionInfoForm
