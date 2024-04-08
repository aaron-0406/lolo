import styled, { css } from 'styled-components'
import type { IThemeColor } from 'styled-components'
import Container from '@/ui/Container'
import Icon from '@/ui/Icon'
import Text from '@/ui/Text'

type TextColor = Pick<
  IThemeColor,
  | 'Neutral0'
  | 'Neutral1'
  | 'Neutral4'
  | 'Neutral5'
  | 'Neutral6'
  | 'Neutral8'
  | 'Neutral9'
  | 'Danger5'
  | 'Primary5'
  | 'Success5'
>

export type LabelProps = {
  label?: string
  name?: string
  required?: boolean
  disabled?: boolean
  optional?: boolean
  tooltipMessage?: string
  color?: keyof TextColor
}

const Label: React.FC<LabelProps> = (props) => {
  const { label, name, disabled, required, optional, tooltipMessage, color } = props

  return (
    <StyledLabelContainer
      display="flex"
      flexDirection="row"
      alignItems="center"
      gap="4px"
      $disabled={disabled}
      $color={color}
    >
      {required && (
        <Text.Body size="m" weight="bold" className="required__text" color={color}>
          *
        </Text.Body>
      )}

      {!!label && (
        <Text.Body size="m" weight="bold" className="label__text" color={color}>
          <label htmlFor={name}>{label}</label>
        </Text.Body>
      )}

      {/* TODO: add tooltip library here and fix color*/}
      {!!tooltipMessage && <Icon size={16} className="tooltip" remixClass="ri-information-line" color="Neutral5" />}

      {optional && (
        <Text.Body className="optional__text" size="m" weight="regular" color={color}>
          (optional)
        </Text.Body>
      )}
    </StyledLabelContainer>
  )
}

export default Label

const StyledLabelContainer = styled(Container)<{ $disabled?: boolean; $color?: string }>`
  ${({ theme, $disabled, $color }) =>
    !$disabled &&
    !$color &&
    css`
      .required__text {
        color: ${theme.colors.Danger5};
      }

      .label__text {
        color: ${theme.colors.Neutral8};
      }

      .optional__text {
        color: ${theme.colors.Neutral6};
      }
    `}

  ${({ theme, $disabled }) =>
    $disabled &&
    css`
      .required__text {
        color: ${theme.colors.Neutral5};
      }

      .label__text {
        color: ${theme.colors.Neutral5};
      }

      .optional__text {
        color: ${theme.colors.Neutral5};
      }
    `}
`
