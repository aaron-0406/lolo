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
import styled, { css } from 'styled-components'
import Icon from '@/ui/Icon'

const subRoles: Record<string, string> = {
  RESPONSABLE_JUDICIAL: 'RESPONSABLE JUDICIAL',
  ABOGADO: 'ABOGADO',
  GESTOR: 'GESTOR',
};

const UserInfoForm = () => {
  const {
    client: { customer },
  } = useLoloContext()

  const {
    control,
    getValues, 
    setValue, 
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

  const onDeleteSubRole = (subRol: string) => {
    const subRolesValues = JSON.parse(getValues('subRoles'))
    const newSubRolesValues = subRolesValues.filter((subRole: string) => subRole !== subRol)
    setValue('subRoles', JSON.stringify(newSubRolesValues), { shouldValidate: true })
  }

  const roles = data?.data ?? []
  const optionsRoles: Array<SelectItemType> = roles.map((rol) => {
    return { key: String(rol.id), label: rol.name }
  })

  const optionsSubRoles: Array<SelectItemType> = Object.keys(subRoles).map((key) => {
    return { key: String(key), label: subRoles[key] }
  })

  const subRolesValues = JSON.parse(getValues('subRoles'))

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
        <Container width="100%" display="flex" justifyContent="space-between" gap="10%">
          <Label label="Sub Roles:" />
          <Controller
            name="subRoles"
            control={control}
            render={({ field }) => (
              <Select
                width="70%"
                placeholder='Seleccione los sub roles'
                value={String(field.value)}
                options={optionsSubRoles}
                onChange={(key) => {
                  const currentSubRoles = JSON.parse(getValues('subRoles') || '[]');
                  
                  if (subRoles[key]) {
                    currentSubRoles.push(subRoles[key]);
                    const newData: Array<string> = Array.from(new Set(currentSubRoles));
                    setValue('subRoles', JSON.stringify(newData), { shouldValidate: true });
                  } else {
                    console.error('Clave no válida:', key);
                  }
                }}
                hasError={!!errors.roleId}
              />
            )}
          />
        </Container>
        <Container width="!00%" display="flex" min-height="70px" alignItems='center' justifyContent="end" gap="10px" padding="2px">
          {Array.isArray(subRolesValues) && subRolesValues.length
            ? subRolesValues.map((subRole: string, index: number) => {
                return <SubRolTag key={index} subRol={subRole} onDelete={onDeleteSubRole} />
              })
            : null}
        </Container>
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

const SubRolTag = ({subRol, onDelete} : {subRol: string, onDelete: (subRol: string) => void}) => {
  return (
    <StyledTag>
      {subRol}
      <Icon remixClass='ri-close-line' className='tag__icon' onClick={()=>onDelete(subRol)} />
    </StyledTag>
  )
}

const StyledTag = styled(Container)`
  ${({ theme }) => css`
    flex-direction: row;
    gap: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 5px;
    padding-left: 10px ;
    background-color: ${theme.colors.Primary5};
    color: ${theme.colors.Neutral1};
    border-radius: 4px;
    .tag__icon{
      cursor: pointer;
      color: ${theme.colors.Neutral1};
      font-size: 20px;
    }
  `}
`

