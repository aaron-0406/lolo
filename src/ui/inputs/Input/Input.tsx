import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import type { IRegular } from 'styled-components'
import styled, { useTheme } from 'styled-components'
import { css } from 'styled-components'
import type { InputSize } from './Input.interfaces'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: InputSize
}

const Input = forwardRef(
  (
    props: InputProps,
    ref: ((instance: HTMLInputElement | null) => void) | React.RefObject<HTMLInputElement> | null | undefined
  ) => {
    const { size = 'small', ...rest } = props

    const theme = useTheme()

    const textStyle = size === 'small' ? theme.typography.body.m.regular : theme.typography.body.l.regular

    return <StyledInput ref={ref} className="input-field" autoComplete="off" {...textStyle} {...rest} />
  }
)

Input.displayName = 'Input'

export default Input

type StyledInputProps = IRegular

const StyledInput = styled.input<StyledInputProps>`
  ${(props) => css`
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
  `}
`
