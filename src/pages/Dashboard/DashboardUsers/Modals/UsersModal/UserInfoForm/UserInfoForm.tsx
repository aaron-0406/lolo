import { CustomerUserType } from '../../../../../../shared/types/customer-user.type'
import { Controller, useFormContext } from 'react-hook-form'
import Container from '../../../../../../ui/Container'
import Label from '../../../../../../ui/Label'
import TextField from '../../../../../../ui/fields/TextField'
import { SelectItemType } from '../../../../../../ui/Select/interfaces'
import Select from '../../../../../../ui/Select'

const UserInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CustomerUserType>()

  const optionsStates: Array<SelectItemType> = [
    { key: 'EDITOR', label: 'EDITOR' },
    { key: 'LECTOR', label: 'LECTOR' },
  ]

  return (
    <>
      <Container width="100%" display="flex" gap="10%">
        <Label label="Nombre: " />
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.name} />
          )}
        />
      </Container>

      <Container width="100%" display="flex" gap="10%">
        <Label label="Apellido: " />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.lastName} />
          )}
        />
      </Container>

      <Container width="100%" display="flex" gap="10%">
        <Label label="Teléfono: " />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.phone} />
          )}
        />
      </Container>

      <Container width="100%" display="flex" gap="10%">
        <Label label="DNI: " />
        <Controller
          name="dni"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.dni} />
          )}
        />
      </Container>

      <Container width="100%" display="flex" gap="10%">
        <Label label="CORREO: " />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.email} />
          )}
        />
      </Container>

      <Container width="100%" display="flex" gap="10%">
        <Label label="CONTRASEÑA: " />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField width="100%" value={field.value} onChange={field.onChange} hasError={!!errors.password} />
          )}
        />
      </Container>

      <Container width="100%" display="flex" gap="10%">
        <Label label="Privilegio: " />
        <Controller
          name="privilege"
          control={control}
          render={({ field }) => (
            <Select
              width="100%"
              value={field.value}
              options={optionsStates}
              onChange={(key) => {
                field.onChange(key)
              }}
              hasError={!!errors.privilege}
            />
          )}
        />
      </Container>
    </>
  )
}

export default UserInfoForm
