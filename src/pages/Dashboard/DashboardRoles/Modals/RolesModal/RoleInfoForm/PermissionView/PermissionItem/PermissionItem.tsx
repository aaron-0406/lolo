import { useFormContext } from 'react-hook-form'
import { PermissionType } from '@/types/dash/permission.type'
import Container from '@/ui/Container'
import Icon from '@/ui/Icon'
import Switch from '@/ui/Switch'
import Text from '@/ui/Text'
import { RoleType } from '@/types/dash/role.type'

type PermissionViewProps = {
  permissions?: Array<PermissionType>
  padding: number
}
const PermissionItem = (props: PermissionViewProps) => {
  const { permissions, padding = 0 } = props

  const { watch, setValue } = useFormContext<RoleType>()

  const onChangeSwitch = (permission: PermissionType) => {
    if (watch('permissions').includes(permission.id)) {
      return setValue(
        'permissions',
        watch('permissions').filter((item) => item !== permission.id)
      )
    }
    return setValue('permissions', [...watch('permissions'), permission.id])
  }

  return (
    <Container style={{ paddingLeft: `${padding}px` }} width="100%" display="flex" gap="5px" flexDirection="column">
      {permissions?.map((item) => {
        return (
          <Container key={item.code} padding="10px 0px 0px 0px">
            <Container display="flex" justifyContent="space-between">
              <Container display="flex" flexDirection="row" gap="10px">
                <Icon remixClass={item.icon} />
                <Text.Body size="m" weight="bold">
                  {item.name}
                </Text.Body>
              </Container>

              <Switch
                checked={watch('permissions').includes(item.id)}
                onChange={() => {
                  onChangeSwitch(item)
                }}
              />
            </Container>

            <PermissionItem padding={padding + 15} permissions={item.permissions} />
          </Container>
        )
      })}
    </Container>
  )
}

export default PermissionItem
