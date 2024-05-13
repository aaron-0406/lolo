import { HTMLInputTypeAttribute, createRef, useState } from 'react'
import type CSS from 'csstype'
import styled, { css } from 'styled-components'
import Container from '@/ui/Container'
import HelperText from '@/ui/HelperText'
import type { InputSize } from '@/ui/inputs/Input/Input.interfaces'
import type { HelperFieldProps, LabelFieldProps } from '@/ui/fields/interfaces'
import InputText from '@/ui/inputs/InputText'
import InputLabel from '@/ui/Label'
import InputCurrency from '@/ui/inputs/InputCurrency'

type TextFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> &
  LabelFieldProps &
  HelperFieldProps & {
    width?: string
    leadingIcon?: string
    trailingIcon?: string
    suffix?: string
    prefix?: string
    type?: HTMLInputTypeAttribute | 'currency'
    size?: InputSize
    clearInput?: boolean
    onClickTrailing?: (value: string) => void
  }

const initialCounter = 0

const TextField: React.FC<TextFieldProps> = (props) => {
  const {
    label,
    value,
    width,
    wrap,
    tooltipMessage,
    helperText,
    optional,
    required,
    charactersLimit,
    onClickTrailing,
    clearInput = false,
    type,
    ...rest
  } = props

  const inputRef = createRef<HTMLInputElement>()

  const inputEvent = new Event('change', { bubbles: true })

  const onClear = () => {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement?.prototype, 'value')?.set

    if (inputRef.current && nativeInputValueSetter) {
      nativeInputValueSetter.call(inputRef.current, '')
      inputRef.current.dispatchEvent(inputEvent)
      setCountDown(initialCounter)
    }
  }

  const onClickTrailingIcon = () => {
    onClickTrailing?.(String(value))
  }

  const [countDown, setCountDown] = useState<number>(
    props.defaultValue ? props.defaultValue?.toString()?.length : value ? value?.toString()?.length : initialCounter
  )

  const onKeyUpInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.currentTarget.value) {
      setCountDown(event.currentTarget.value.length)
    } else {
      setCountDown(initialCounter)
    }
  }

  return (
    <StyledWrapper width={width} gap={label ? '8px' : 0}>
      <InputLabel
        name={rest.name}
        label={label}
        tooltipMessage={tooltipMessage}
        required={required}
        optional={optional}
        disabled={rest.disabled}
      />

      <Container display="flex" flexDirection="column" gap="4px">
        {type !== 'currency' ? (
          <InputText
            ref={inputRef}
            onClear={onClear}
            onClickTrailingIcon={onClickTrailingIcon}
            onKeyUp={onKeyUpInput}
            value={value}
            numberCharacters={countDown}
            clearInput={clearInput}
            type={type}
            {...rest}
          />
        ) : (
          <InputCurrency
            ref={inputRef}
            prefix="S/. "
            decimalScale={2}
            allowDecimals
            onClear={onClear}
            onClickTrailingIcon={onClickTrailingIcon}
            onKeyUp={onKeyUpInput}
            value={value}
            decimalSeparator="."
            groupSeparator=","
            decimalsLimit={2}
            numberCharacters={countDown}
            clearInput={clearInput}
            type={type}
            {...rest}
          />
        )}

        <HelperText
          wrap={wrap}
          hasError={rest.hasError}
          countDown={countDown}
          disabled={rest.disabled}
          width={width}
          charactersLimit={charactersLimit}
        >
          {helperText}
        </HelperText>
      </Container>
    </StyledWrapper>
  )
}

export default TextField

const StyledWrapper = styled(Container)<{ width?: CSS.Property.Width }>`
  ${({ theme, width }) => css`
    display: flex;
    flex-direction: column;
    width: ${!!width ? width : 'max-content'};
    color: ${theme.colors.Neutral6};
  `}
`
