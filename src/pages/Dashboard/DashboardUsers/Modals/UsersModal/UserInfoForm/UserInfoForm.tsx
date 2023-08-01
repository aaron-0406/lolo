import { CustomerUserType } from '../../../../../../shared/types/customer-user.type'
import { Controller, useFormContext } from 'react-hook-form'
import Container from '../../../../../../ui/Container'
import Label from '../../../../../../ui/Label'
import TextField from '../../../../../../ui/fields/TextField'
import Select from '../../../../../../ui/Select'

const UserInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CustomerUserType>()

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
        <Label label="Telefono: " />
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
        <Label label="Privilegio " />
        <Controller
          name="privilege"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onChange={(e) => {
                field.onChange(e)
              }}
            />
          )}
        />
      </Container>
    </>
  )
}

export default UserInfoForm
