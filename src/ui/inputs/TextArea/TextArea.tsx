import type { TextareaHTMLAttributes } from 'react'
import styled, { css, useTheme } from 'styled-components'
import type { IRegular } from 'styled-components'

export type TextAreaSizeType = 'small' | 'medium'

export type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> & {
  size?: TextAreaSizeType
}

const TextArea: React.FC<TextAreaProps> = (props) => {
  const theme = useTheme()

  const textStyle = theme.typography.body.l.regular

  return <StyledTextArea {...textStyle} {...props} />
}

export default TextArea

type StyledTextAreaProps = IRegular & {
  size?: TextAreaSizeType
}

/**
 * Styled TextArea Component
 * Do not export, use TextArea
 */
const StyledTextArea = styled.textarea<StyledTextAreaProps>`
  ${(props) => css`
    font-size: ${props.fontSize}px;
    font-family: ${props.fontFamily};
    font-weight: ${props.fontWeight};
    letter-spacing: ${props.letterSpacing}px;
    line-height: ${props.lineHeight}px;
    color: ${props.theme.colors.Neutral8};
    width: 100%;
    resize: vertical;
    outline: none;

    :disabled {
      color: ${props.theme.colors.Neutral5};
    }
  `}
`
