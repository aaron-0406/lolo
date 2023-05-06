import { useState } from 'react'
import type CSS from 'csstype'
import styled, { css } from 'styled-components'
import Container from '../../Container'
import HelperText from '../../HelperText'
import type { TextAreaSizeType } from '../../inputs/TextArea/TextArea'
import type { HelperFieldProps, LabelFieldProps } from '../interfaces'
import InputTextArea from '../../inputs/InputTextArea'
import InputLabel from '../../Label'

type TextAreaFieldProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> &
  LabelFieldProps &
  HelperFieldProps & {
    width?: string
  } & {
    size?: TextAreaSizeType
  }

const initialCounter = 0
const CHARACTERS_LIMIT_SMALL_SIZE = 50

const TextAreaField: React.FC<TextAreaFieldProps> = (props) => {
  const {
    label,
    value,
    width,
    size = 'medium',
    wrap,
    tooltipMessage,
    helperText,
    optional,
    required,
    charactersLimit,
    ...rest
  } = props

  const [countDown, setCountDown] = useState<number>(
    props.defaultValue ? props.defaultValue?.toString()?.length : value ? value?.toString()?.length : initialCounter
  )

  const charactersLimitSize = size === 'small' ? CHARACTERS_LIMIT_SMALL_SIZE : charactersLimit

  const onKeyUpInput = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.currentTarget.value) {
      setCountDown(event.currentTarget.value.length)
    } else {
      setCountDown(initialCounter)
    }
  }

  return (
    <StyledWrapper width={width}>
      <InputLabel
        name={rest.name}
        label={label}
        tooltipMessage={tooltipMessage}
        required={required}
        optional={optional}
        disabled={rest.disabled}
      />

      <Container display="flex" flexDirection="column" gap="4px">
        <InputTextArea value={value} onKeyUp={onKeyUpInput} size={size} {...rest} />

        <HelperText
          wrap={wrap}
          hasError={rest.hasError}
          countDown={countDown}
          disabled={rest.disabled}
          width={width}
          charactersLimit={charactersLimitSize}
        >
          {helperText}
        </HelperText>
      </Container>
    </StyledWrapper>
  )
}

export default TextAreaField

const StyledWrapper = styled.div<{ width?: CSS.Property.Width }>`
  ${({ theme, width }) => css`
    gap: 8px;
    display: flex;
    flex-direction: column;
    width: ${!!width ? width : 'max-content'};
    color: ${theme.colors.Neutral6};
  `}
`
