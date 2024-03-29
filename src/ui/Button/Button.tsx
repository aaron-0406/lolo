import { useMemo, type ButtonHTMLAttributes } from 'react'
import { Tooltip } from 'react-tooltip'
import type { IRegular } from 'styled-components'
import styled, { css, useTheme } from 'styled-components'
import CounterBadge from '@/ui/CounterBadge'
import Icon from '@/ui/Icon'
import Spinner from '@/ui/Spinner'
import type { ButtonClassType, ButtonHierarchyType, ButtonShapeType, ButtonSizeType } from './interfaces'
import style from './style'
import { useLoloContext } from '@/contexts/LoloProvider'

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> & {
  counter?: number
  loading?: boolean
  leadingIcon?: string
  trailingIcon?: string
  size?: ButtonSizeType
  hierarchy?: ButtonHierarchyType
  display?: ButtonClassType
  shape?: ButtonShapeType
  width?: string
  maxWidth?: string
  label?: React.ReactNode
  messageTooltip?: string
  permission?: string
}

/**
 * Buttom Component
 * @prop {number} counter  The counter is the quantity indicator and this text is just numbers and goes at the beginning of the button.
 * @prop {boolean} loading The loading state of the button
 * @prop {string} leadingIcon Can be set class of remix icon, located on the left side of the button, https://remixicon.com/
 * @prop {string} trailingIcon Can be set class of remix icon, located on the right side of the button, https://remixicon.com/
 * @prop {ButtonSizeType} size Set the size of button "small" | "default"
 * @prop {ButtonHierarchyType} hierarchy Can be set to "primary" | "secondary" | "tertiary" | "link"
 * @prop {ButtonClassType} display   Can be set to "warning" | "danger" | "default"
 * @prop {ButtonShapeType} shape   Can be set button shape "default" | "round"
 * @prop {string} width Can be set width of the button
 * @prop {string} label Can be set text of the button
 * @prop {string} permission Can be set text of the button
 */
const Button: React.FC<ButtonProps> = (props) => {
  const {
    label,
    messageTooltip,
    counter,
    leadingIcon,
    trailingIcon,
    disabled = false,
    hierarchy = 'primary',
    size = 'default',
    display = 'default',
    shape = 'default',
    loading = false,
    permission,
    ...rest
  } = props

  const theme = useTheme()
  const {
    customerUser: { user },
  } = useLoloContext()

  const hasAccessToTheButton = useMemo(() => {
    const permissions = user.permissions?.map((permission) => permission.code) ?? []
    return permissions.includes(permission ?? '')
  }, [user.permissions, permission])

  const textStyle =
    hierarchy === 'link' && size === 'default' ? theme.typography.body.l.bold : theme.typography.body.m.bold

  if (permission && !hasAccessToTheButton) {
    return null
  }

  return (
    <StyledButton
      data-tooltip-id="button-tooltip"
      data-tooltip-content={messageTooltip}
      type="button"
      {...rest}
      size={size}
      hierarchy={hierarchy}
      display={display}
      disabled={disabled}
      shape={shape}
      $loading={loading}
    >
      <div className="button__container">
        {!!counter && (
          <CounterBadge
            label={counter}
            containerClassName="button__counter"
            contentClassName="button__counter-content"
          />
        )}

        {!!messageTooltip && <Tooltip place="right" id="button-tooltip" />}

        {loading ? <Spinner /> : leadingIcon && <Icon className="leading-icon" remixClass={leadingIcon} />}

        <StyledButtonText {...textStyle}>{label}</StyledButtonText>
        {trailingIcon && !loading && <Icon className="trailing-icon" remixClass={trailingIcon} />}
      </div>
    </StyledButton>
  )
}

export default Button

const getButtonSize = (size?: ButtonSizeType, icon?: boolean) => {
  switch (size) {
    case 'small':
      return css`
        height: 40px;
        width: ${icon && '40px'};
        padding: ${icon ? '6px' : '6px 12px 6px 12px'};
      `
    default:
      return css`
        height: 48px;
        width: ${icon && '48px'};
        padding: ${icon ? '10px' : '10px 14px 10px 14px'};
      `
  }
}

/**
 * Styled Button Component
 * Do not export, use Buttton
 */
const StyledButton = styled.button<{
  size: ButtonSizeType
  hierarchy: ButtonHierarchyType
  display: ButtonClassType
  shape: ButtonShapeType
  $loading: boolean
  width?: string
  maxWidth?: string
}>`
  white-space: nowrap;
  ${({ width }) =>
    !!width &&
    css`
      width: ${width};
    `}

  ${({ maxWidth }) =>
    !!maxWidth &&
    css`
      max-width: ${maxWidth};
    `}

  ${({ shape, size }) => getButtonSize(size, shape === 'round')}

  ${({ shape }) =>
    shape === 'default' &&
    css`
      .button__container {
        display: flex;
        gap: 8px;
        justify-content: center;
      }
    `}

  ${({ theme, hierarchy, display, $loading }) => {
    const config = style(theme.colors)[`${hierarchy}-${display}`]

    return css`
      cursor: pointer;
      border-radius: 40px;

      background: ${config.background};
      color: ${config.color};
      border: ${config.border};

      .button__counter {
        border: ${config.badgeBorder};
        background: ${theme.colors.Neutral0};

        .button__counter-content {
          color: ${config.badgeColor};
        }
      }

      .leading-icon,
      .trailing-icon {
        color: ${config.color};
      }

      :hover {
        background: ${config.hover.background};
        border: ${config.hover.border};
        color: ${config.hover.color};

        .button__counter {
          border: ${config.hover.badgeBorder};

          ${hierarchy === 'tertiary' &&
          css`
            background: transparent;
          `}

          .button__counter-content {
            color: ${config.hover.badgeColor};
          }
        }

        .leading-icon,
        .trailing-icon {
          color: ${config.hover.color};
        }
      }

      :active {
        background: ${config.pressed.background};
        border: ${config.pressed.border};
        color: ${config.pressed.color};

        .button__counter {
          border: ${config.pressed.badgeBorder};

          .button__counter-content {
            color: ${config.pressed.badgeColor};
          }
        }

        .leading-icon,
        .trailing-icon {
          color: ${config.pressed.color};
        }
      }

      &[disabled] {
        cursor: not-allowed;
        background: ${config.disabled.background};
        border: ${config.disabled.border};
        color: ${config.disabled.color};

        .button__counter {
          border: ${config.disabled.badgeBorder};

          .button__counter-content {
            color: ${config.disabled.badgeColor};
          }
        }

        .leading-icon,
        .trailing-icon {
          color: ${config.disabled.color};
        }
      }

      ${$loading &&
      css`
        pointer-events: none;
        cursor: not-allowed;
        background: ${config.loading.background};
        border: ${config.loading.border};
        color: ${config.loading.color};

        .button__counter {
          border: ${config.loading.badgeBorder};

          .button__counter-content {
            color: ${config.loading.badgeColor};
          }
        }

        .leading-icon,
        .trailing-icon {
          color: ${config.loading.color};
        }
      `}
    `
  }}

  ${({ hierarchy, size }) =>
    hierarchy === 'link' &&
    css`
      padding: 0;
      height: ${size === 'default' ? '32px' : '24px'};
    `}
`

type StyledButtonTextProps = IRegular

const StyledButtonText = styled.span<StyledButtonTextProps>`
  ${(props) => css`
    font-size: ${props.fontSize}px;
    font-family: ${props.fontFamily};
    font-weight: ${props.fontWeight};
    letter-spacing: ${props.letterSpacing}px;
    line-height: ${props.lineHeight}px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`
