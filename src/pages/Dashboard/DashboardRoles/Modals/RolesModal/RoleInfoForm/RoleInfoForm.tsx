/* eslint-disable react-hooks/exhaustive-deps */
import { Controller, useFormContext } from 'react-hook-form'
import Container from '../../../../../../ui/Container/Container'
import TextField from '../../../../../../ui/fields/TextField'
import Label from '../../../../../../ui/Label/Label'
import { RoleType } from '../../../../../../shared/types/dash/role.type'
import { useQuery } from 'react-query'
import { getAllPermissions } from '../../../../../../shared/services/dash/permission.service'
import { KEY_DASH_PERMISOS_CACHE } from '../../../../DashboardPermissions/PermissionsTable/utils/dash-permisos.cache'
import { useEffect, useState } from 'react'
import { PermissionType } from '../../../../../../shared/types/dash/permission.type'
import PermissionView from './PermissionView'

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
    return () => {}
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
        <Container width="100%" justifyContent="space-between" display="flex" gap="10px" flexWrap="wrap">
          {permissions.map((item) => {
            if (item.permissions && item.permissions.length === 0)
              return <PermissionView permission={item} key={item.code} />
            return null
          })}
        </Container>
        <Container width="100%" justifyContent="space-between" display="flex" gap="10px" flexWrap="wrap">
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
