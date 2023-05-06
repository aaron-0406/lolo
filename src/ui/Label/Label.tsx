import styled, { css } from 'styled-components'
import Container from '../Container'
import Icon from '../Icon'
import Text from '../Text'

export type LabelProps = {
  label?: string
  name?: string
  required?: boolean
  disabled?: boolean
  optional?: boolean
  tooltipMessage?: string
}

const Label: React.FC<LabelProps> = (props) => {
  const { label, name, disabled, required, optional, tooltipMessage } = props

  return (
    <StyledLabelContainer display="flex" flexDirection="row" alignItems="center" gap="4px" $disabled={disabled}>
      {required && (
        <Text.Body size="m" weight="bold" className="required__text">
          *
        </Text.Body>
      )}

      {!!label && (
        <Text.Body size="m" weight="bold" className="label__text">
          <label htmlFor={name}>{label}</label>
        </Text.Body>
      )}

      {/* TODO: add tooltip library here and fix color*/}
      {!!tooltipMessage && <Icon size={16} className="tooltip" remixClass="ri-information-line" color="Neutral5" />}

      {optional && (
        <Text.Body className="optional__text" size="m" weight="regular">
          (optional)
        </Text.Body>
      )}
    </StyledLabelContainer>
  )
}

export default Label

const StyledLabelContainer = styled(Container)<{ $disabled?: boolean }>`
  ${({ theme, $disabled }) =>
    !$disabled &&
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
