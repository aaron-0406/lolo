import { Controller, useFormContext } from 'react-hook-form'
import { CustomerUserType } from '@/types/dash/customer-user.type'
import Container from '@/ui/Container'
import Label from '@/ui/Label'
import TextField from '@/ui/fields/TextField'
import { SelectItemType } from '@/ui/Select/interfaces'
import Select from '@/ui/Select'
import { useDashContext } from '@/contexts/DashProvider'
import { useQuery } from 'react-query'
import { KEY_DASH_ROLES_CACHE } from '@/pages/dashboard/DashboardRoles/RolesTable/utils/dash-role.cache'
import { getAllRolesByCustomerId } from '@/services/dash/role.service'
import notification from '@/ui/notification'
import { AxiosResponse } from 'axios'
import { RoleType } from '@/types/dash/role.type'

const UserInfoForm = () => {
  const {
    dashCustomer: { selectedCustomer },
  } = useDashContext()

  const {
    control,
    formState: { errors },
  } = useFormContext<CustomerUserType>()

  const optionsStates: Array<SelectItemType> = [
    { key: 'EDITOR', label: 'EDITOR' },
    { key: 'LECTOR', label: 'LECTOR' },
  ]

  const { data } = useQuery<AxiosResponse<Array<RoleType>>>(
    [KEY_DASH_ROLES_CACHE, selectedCustomer.id],
    async () => {
      return await getAllRolesByCustomerId(selectedCustomer.id)
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
