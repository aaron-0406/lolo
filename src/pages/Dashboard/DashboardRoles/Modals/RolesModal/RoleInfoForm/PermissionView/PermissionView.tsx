import styled, { css } from 'styled-components'
import { useFormContext } from 'react-hook-form'
import { PermissionType } from '../../../../../../../shared/types/dash/permission.type'
import Container from '../../../../../../../ui/Container'
import Text from '../../../../../../../ui/Text'
import Switch from '../../../../../../../ui/Switch'
import Icon from '../../../../../../../ui/Icon'
import PermissionItem from './PermissionItem/PermissionItem'
import { RoleType } from '../../../../../../../shared/types/dash/role.type'

type PermissionViewProps = {
  permission: PermissionType
}

const PermissionView = (props: PermissionViewProps) => {
  const {
    permission: { icon, id, name, permissions },
  } = props
  const { watch, setValue } = useFormContext<RoleType>()

  const onChangeSwitch = () => {
    if (watch('permissions').includes(id)) {
      return setValue(
        'permissions',
        watch('permissions').filter((item) => item !== id)
      )
    }
    return setValue('permissions', [...watch('permissions'), id])
  }

  return (
    <StyledContainer
      width="30%"
      minHeight={permissions?.length === 0 ? '0rem' : '10rem'}
      display="flex"
      padding="10px"
      flexDirection="column"
      gap="10px"
    >
      <Container width="100%" display="flex" justifyContent="space-between">
        <Container display="flex" flexDirection="row" gap="10px">
          <Icon remixClass={icon} />
          <Text.Body size="m" weight="bold">
            {name}
          </Text.Body>
        </Container>
        <Switch checked={watch('permissions').includes(id)} onChange={onChangeSwitch} />
      </Container>
      <Container padding="0px 0px 0px 15px" width="100%">
        <PermissionItem padding={0} permissions={permissions} />
      </Container>
    </StyledContainer>
  )
}

export default PermissionView

const StyledContainer = styled(Container)`
  ${({ theme }) => css`
    border-width: 0.5px;
    border-color: ${theme.colors.Neutral5};
  `}
`
