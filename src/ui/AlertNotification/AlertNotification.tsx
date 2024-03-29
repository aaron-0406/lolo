import toast from 'react-hot-toast'
import type { IThemeColor } from 'styled-components'
import { keyframes } from 'styled-components'
import styled, { css } from 'styled-components'
import type { AlertNotificationType } from './interfaces'
import style from './style'
import Container from '@/ui/Container'
import Icon from '@/ui/Icon'
import Text from '@/ui/Text'

export const notificationConfig: Record<
  AlertNotificationType,
  { iconClass: string; color: keyof IThemeColor; duration: number }
> = {
  success: {
    iconClass: 'ri-checkbox-circle-line',
    color: 'Success5',
    duration: 5000,
  },
  error: {
    iconClass: 'ri-error-warning-line',
    color: 'Danger5',
    duration: Infinity,
  },
  warning: {
    iconClass: 'ri-alert-line',
    color: 'Warning4',
    duration: Infinity,
  },
  info: {
    iconClass: 'ri-information-line',
    color: 'Primary5',
    duration: 3000,
  },
}

type AlertNotificationProps = {
  type: AlertNotificationType
  message: React.ReactNode
  list?: Array<string>
  idToast?: string
  visible?: boolean
  close?: boolean
  icon?: boolean
}

const AlertNotification: React.FC<AlertNotificationProps> = (props) => {
  const { type, message, idToast, visible = false, icon = true, close = false, list } = props

  const config = notificationConfig[type]

  const onClose = () => {
    toast.dismiss(idToast)
  }

  return (
    <StyledNotification visible={visible}>
      <StyledWrapper display="flex" flexDirection="column" gap="8px" type={type}>
        <Container display="flex" gap="8px" justifyContent="space-between">
          <Container display="flex" gap="8px">
            {icon && <Icon remixClass={config.iconClass} color={config.color} size={24} />}

            <Text.Body size="m" weight={list ? 'bold' : 'regular'}>
              {message}
            </Text.Body>
          </Container>

          {(config.duration === Infinity || close) && (
            <StyledButtonClose onClick={onClose}>
              <Icon remixClass="ri-close-line" size={24} />
            </StyledButtonClose>
          )}
        </Container>

        {list && (
          <Container padding="10px 40px">
            <StyledList>
              {list.map((message, key: number) => {
                return (
                  <li key={key}>
                    <Text.Body size="m" weight="regular">
                      {message}
                    </Text.Body>
                  </li>
                )
              })}
            </StyledList>
          </Container>
        )}
      </StyledWrapper>
    </StyledNotification>
  )
}

export default AlertNotification

const enterAnimation = keyframes`
  0% {
    transform: translate3d(0, -200%,0); opacity:.5;
  }
  100% {
    transform: translate3d(0,0,0) ; opacity:1;
  }
`

const exitAnimation = keyframes`
  0% {
    transform: translate3d(0,0,-1px) ; opacity:1;
  }
  100% {
    transform: translate3d(0, -150%,-1px); opacity:0;
  }
`

const StyledNotification = styled(Container)<{ visible: boolean }>`
  height: fit-content;
  overflow-wrap: anywhere;

  ${({ visible }) =>
    visible
      ? css`
          animation: ${enterAnimation} 500ms cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
        `
      : css`
          animation: ${exitAnimation} 0.4s forwards cubic-bezier(0.06, 0.71, 0.55, 1);
        `}
`

const StyledWrapper = styled(Container)<{
  type: AlertNotificationType
}>`
  ${({ type, theme }) => {
    const config = style(theme.colors)[type]

    return css`
      width: 340px;
      border-radius: 8px;
      background: ${config.background};
      border: ${config.border};
      padding: 12px 16px;
      box-shadow: ${theme.shadows.elevationLow};
    `
  }}
`

const StyledButtonClose = styled.div`
  ${({ theme }) => css`
    cursor: pointer;
    i {
      color: ${theme.colors['Neutral5']};
      transition: 0.2s color ease;
      &:hover {
        color: ${theme.colors['Neutral6']};
      }
    }
  `}
`

const StyledList = styled.ul`
  list-style: initial;
  display: block;
`
