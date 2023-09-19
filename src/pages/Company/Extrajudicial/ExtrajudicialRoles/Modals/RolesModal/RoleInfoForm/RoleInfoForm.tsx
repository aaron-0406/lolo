/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Controller, useFormContext } from 'react-hook-form'
import Container from '@/ui/Container/Container'
import TextField from '@/ui/fields/TextField'
import Label from '@/ui/Label/Label'
import { RoleType } from '@/types/dash/role.type'
import { getAllPermissions } from '@/services/dash/permission.service'
import { PermissionType } from '@/types/dash/permission.type'
import PermissionView from './PermissionView'
import { KEY_DASH_PERMISOS_CACHE } from '@/pages/dashboard/DashboardPermissions/PermissionsTable/utils/dash-permisos.cache'

const RoleInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<RoleType>()

  const [permissions, setPermissions] = useState<Array<PermissionType>>([])

  const { refetch } = useQuery(
    [KEY_DASH_PERMISOS_CACHE],
    async () => {
      return await getAllPermissions()
    },
    {
      onSuccess: ({ data }) => {
        setPermissions(data)
      },
    }
  )

  useEffect(() => {
    if (permissions.length === 0) refetch()
  }, [])

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

      <Container width="100%" justifyContent="space-evenly" display="flex" gap="10px" flexWrap="wrap">
        <Container width="100%" display="flex" justifyContent="center" gap="20px" flexWrap="wrap">
          {permissions.map((item) => {
            if (item.permissions && item.permissions.length === 0)
              return <PermissionView permission={item} key={item.code} />
            return null
          })}
        </Container>

        <Container width="100%" display="flex" justifyContent="center" gap="20px" flexWrap="wrap">
          {permissions.map((item) => {
            if (item.permissions && item.permissions.length !== 0)
              return <PermissionView permission={item} key={item.code} />
            return null
          })}
        </Container>
      </Container>
    </>
  )
}

export default RoleInfoForm
