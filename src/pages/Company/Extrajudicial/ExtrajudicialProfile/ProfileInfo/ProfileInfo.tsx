import ProfilePicture from '../../../../../shared/assets/icons/ProfilePicture.png'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '@/breakpoints/responsive'
import Container from '@/ui/Container'
import styled, { css } from 'styled-components'
import Text from '../../../../../ui/Text'
import Img from '../../../../../ui/Img'
import Icon from '../../../../../ui/Icon/Icon'
import Button from '../../../../../ui/Button/Button'
import useModal from '../../../../../shared/hooks/useModal'
import UpdatePasswordModal from './UpdatePasswordModal'
import CredentialsModal from './CredentialsModal/CredentialsModal'

const ProfileInfo = () => {
  const {
    customerUser: { user },
  } = useLoloContext()

  const greaterThanDesktopS = useMediaQuery(device.desktopS)

  const { visible: visibleModalPassword, showModal: showModalPassword, hideModal: hideModalPassword } = useModal()
  const {
    visible: visibleModalCredentials,
    showModal: showModalCredentials,
    hideModal: hideModalCredentials,
  } = useModal()

  const handleClickButtonPassword = () => {
    showModalPassword()
  }

  const handleClickModalPassword = () => {
    hideModalPassword()
  }

  const handleClickButtonCredentials = () => {
    showModalCredentials()
  }

  const handleClickModalCredentials = () => {
    hideModalCredentials()
  }

  return (
    <Container
      minWidth={greaterThanDesktopS ? 'calc(40% - 7.5px)' : '100%'}
      gap="15px"
      display="flex"
      flexDirection="column"
      minHeight=""
      backgroundColor="#F2F2F2"
    >
      <StyledContainer
        backgroundColor="#fff"
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        padding="2rem"
        gap="10px"
      >
        <Container width="8rem">
          <StyledPictureContainer placeholderImage="" src={ProfilePicture} />
        </Container>
        <Text.Body color="Primary5" size="l" weight="bold" ellipsis>
          {`${user.name} ${user.lastName}`}
        </Text.Body>
      </StyledContainer>
      <StyledContainer gap="10px" display="flex" padding="1rem" flexDirection="column" backgroundColor="#fff">
        <Container display="flex">
          <Text.Body
            style={{ width: '8rem', display: 'flex', gap: '5px' }}
            color="Primary5"
            size="m"
            weight="regular"
            ellipsis
          >
            <Icon color="Primary5" remixClass="ri-profile-fill"></Icon>
            <Text.Body size="m" weight="bold" color="Primary5">
              DNI:
            </Text.Body>
          </Text.Body>
          <Text.Body size="m" weight="regular" ellipsis>
            {user.dni}
          </Text.Body>
        </Container>
        <Container display="flex">
          <Text.Body
            style={{ width: '8rem', display: 'flex', gap: '5px' }}
            color="Primary5"
            size="m"
            weight="regular"
            ellipsis
          >
            <Icon color="Primary5" remixClass="ri-at-line"></Icon>
            <Text.Body size="m" weight="bold" color="Primary5">
              EMAIL:
            </Text.Body>
          </Text.Body>
          <Text.Body size="m" weight="regular" ellipsis>
            {user.email}
          </Text.Body>
        </Container>
        <Container display="flex">
          <Text.Body
            style={{ width: '8rem', display: 'flex', gap: '5px' }}
            color="Primary5"
            size="m"
            weight="regular"
            ellipsis
          >
            <Icon color="Primary5" remixClass="ri-phone-line"></Icon>
            <Text.Body size="m" weight="bold" color="Primary5">
              TELÉFONO:
            </Text.Body>
          </Text.Body>
          <Text.Body size="m" weight="regular" ellipsis>
            {user.phone}
          </Text.Body>
        </Container>
      </StyledContainer>
      <StyledContainer gap="10px" display="flex" padding="1rem" flexDirection="row" backgroundColor="#fff">
        <Button
          onClick={handleClickButtonPassword}
          messageTooltip="Actualizar Contraseña"
          width="140px"
          shape="round"
          trailingIcon="ri-shield-keyhole-line"
        />
        <Button
          onClick={handleClickButtonCredentials}
          messageTooltip="Modificar Credenciales"
          width="140px"
          shape="round"
          trailingIcon="ri-edit-2-line"
        />
        <UpdatePasswordModal visible={visibleModalPassword} onClose={handleClickModalPassword} />
        <CredentialsModal visible={visibleModalCredentials} onClose={handleClickModalCredentials} />
      </StyledContainer>
    </Container>
  )
}

export default ProfileInfo

const StyledContainer = styled(Container)`
  border-radius: 5px;
`

const StyledPictureContainer = styled(Img)`
  ${({ theme }) => css`
    border-color: ${theme.colors.Primary1};
  `}
  border-radius: 50%;
  border: 0.5px;
  border-style: solid;
`
