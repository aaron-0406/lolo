import { useQuery } from 'react-query'
import { Controller, useFormContext } from 'react-hook-form'
import { CustomerUserType } from '@/types/dash/customer-user.type'
import Container from '@/ui/Container'
import Label from '@/ui/Label'
import TextField from '@/ui/fields/TextField'
import { SelectItemType } from '@/ui/Select/interfaces'
import Select from '@/ui/Select'
import { getAllRolesByCustomerId } from '@/services/dash/role.service'
import notification from '@/ui/notification'
import Text from '@/ui/Text'
import { AxiosResponse } from 'axios'
import { RoleType } from '@/types/dash/role.type'
import { useLoloContext } from '@/contexts/LoloProvider'
import { KEY_EXT_ROLES_CACHE } from '@/pages/extrajudicial/ExtrajudicialRoles/RolesTable/utils/ext-role.cache'

const UserInfoForm = () => {
  const {
    client: { customer },
  } = useLoloContext()

  const {
    control,
    formState: { errors },
  } = useFormContext<CustomerUserType>()

  const { data } = useQuery<AxiosResponse<Array<RoleType>>>(
    [KEY_EXT_ROLES_CACHE, customer.id],
    async () => {
      return await getAllRolesByCustomerId(customer.id)
    },
    {
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const roles = data?.data ?? []
  const optionsRoles: Array<SelectItemType> = roles.map((rol) => {
    return { key: String(rol.id), label: rol.name }
  })

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
        <Label label="Rol: " />
        <Controller
          name="roleId"
          control={control}
          render={({ field }) => (
            <Select
              width="100%"
              value={String(field.value)}
              options={optionsRoles}
              onChange={(key) => {
                field.onChange(parseInt(key))
              }}
              hasError={!!errors.roleId}
            />
          )}
        />
      </Container>

      <Container width="100%" display="flex" flexDirection="column" gap="10%">
        <Container width="100%" display="flex" gap="10%">
          <Label label="CONTRASEÑA: " />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                type="password"
                width="100%"
                value={field.value}
                onChange={field.onChange}
                hasError={!!errors.password}
              />
            )}
          />
        </Container>
        <Text.Body size="s" color="Danger5" weight="bold">
          {errors.password ? errors.password?.message : ''}
        </Text.Body>
      </Container>
    </>
  )
}

export default UserInfoForm
