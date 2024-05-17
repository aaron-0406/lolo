import Container from '@/ui/Container'
import Icon from '@/ui/Icon'
import Text from '@/ui/Text'
import { ReactNode, forwardRef } from 'react'
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field'
import styled, { IRegular, css, useTheme } from 'styled-components'
import { InputSize } from '../Input/Input.interfaces'

type InputCurrencyProps = Omit<CurrencyInputProps, 'size' | 'step' | 'defaultValue'> & {
  tooltipMessage?: string
  leadingIcon?: string
  trailingIcon?: string
  suffix?: ReactNode
  optional?: boolean
  hasError?: boolean
  width?: string
  onClear?: () => void
  onClickTrailingIcon?: () => void
  clearInput?: boolean
  size?: InputSize
  numberCharacters?: number
}

const InputCurrency = forwardRef(
  (
    props: InputCurrencyProps,
    ref: ((instance: HTMLInputElement | null) => void) | React.RefObject<HTMLInputElement> | null | undefined
  ) => {
    const {
      width,
      suffix,
      prefix,
      onClear,
      onClickTrailingIcon,
      disabled,
      leadingIcon,
      trailingIcon,
      numberCharacters,
      size = 'small',
      hasError = false,
      clearInput = false,
      ...rest
    } = props

    const theme = useTheme()

    const textStyle = size === 'small' ? theme.typography.body.m.regular : theme.typography.body.l.regular

    return (
      <StyledInputWrapper $size={size} $hasError={hasError} $disabled={disabled} $width={width} {...textStyle}>
        {!!leadingIcon && (
          <Container
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="24px"
            height="24px"
            className="leading__icon"
          >
            <Icon size={20} remixClass={leadingIcon} />
          </Container>
        )}

        {!!prefix && (
          <Text.Body size="m" weight="regular" className="prefix__text">
            {prefix}
          </Text.Body>
        )}

        <CurrencyInput ref={ref} disabled={disabled} {...rest} />

        {!!suffix && (
          <Text.Body size="m" weight="regular" className="suffix__text">
            {suffix}
          </Text.Body>
        )}

        {!disabled && hasError ? (
          <div className="error__icon">
            <Icon size={20} remixClass="ri-error-warning-line" color="Danger5" />
          </div>
        ) : !disabled && clearInput && numberCharacters ? (
          <Icon
            className="icon__clear-input"
            size={20}
            remixClass="ri-close-circle-line"
            color="Neutral6"
            onClick={onClear}
          />
        ) : (
          !!trailingIcon && (
            <Container
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="24px"
              height="24px"
              className="trailing__icon"
            >
              <Icon size={20} remixClass={trailingIcon} onClick={onClickTrailingIcon} />
            </Container>
          )
        )}
      </StyledInputWrapper>
    )
  }
)

export default InputCurrency

InputCurrency.displayName = 'InputCurrency'

const StyledInputWrapper = styled.div<
  {
    $disabled?: boolean
    $hasError?: boolean
    $size: InputSize
    $width?: string
  } & IRegular
>`
  ${(props) => css`
    input {
      all: unset;
      font-size: ${props.fontSize}px;
      font-family: ${props.fontFamily};
      font-weight: ${props.fontWeight};
      letter-spacing: ${props.letterSpacing}px;
      line-height: ${props.lineHeight}px;
      color: ${props.theme.colors.Neutral8};
      width: 100%;
      text-align: left;

      :disabled {
        color: ${props.theme.colors.Neutral5};
      }
    }
  `}

  ${({ theme, $disabled, $hasError, $size, $width }) => css`
    display: flex;
    align-items: center;
    width: ${!!$width ? $width : 'auto'};
    height: ${$size === 'small' ? '40px' : '48px'};
    color: ${theme.colors.Neutral6};
    background: ${theme.colors.Neutral0};
    border: 2px solid ${theme.colors.Neutral4};
    border-radius: 8px;
    padding: 8px 16px;
    gap: 8px;

    .icon__clear-input {
      cursor: pointer;
    }

    .leading__icon,
    .trailing__icon {
      i {
        color: ${theme.colors.Neutral6};
      }
    }

    .prefix__text,
    .suffix__text {
      color: ${theme.colors.Neutral6};
    }

    :hover {
      border: 2px solid ${theme.colors.Neutral5};
    }

    :focus-within {
      border: 2px solid ${theme.colors.Primary5};
    }

    ${$hasError &&
    css`
      background: ${theme.colors.Danger1};
      border: 2px solid ${theme.colors.Danger5};

      .leading__icon,
      .trailing__icon {
        color: ${theme.colors.Danger5};
      }

      :hover,
      :focus-within {
        border: 2px solid ${theme.colors.Danger5};
      }
    `}

    ${$disabled &&
    css`
      color: ${theme.colors.Neutral5};
      background: ${theme.colors.Neutral3};
      border: 2px solid ${theme.colors.Neutral4};

      :hover {
        border: 2px solid ${theme.colors.Neutral4};
      }

      .prefix__text,
      .suffix__text {
        color: ${theme.colors.Neutral5};
      }

      .leading__icon,
      .trailing__icon {
        i {
          color: ${theme.colors.Neutral5};
        }
      }
    `}
  `}
`
