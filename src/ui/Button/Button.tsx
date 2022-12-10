import styled from 'styled-components'

import { ButtonProps, IconProps } from './button.interface'

const Button: React.FC<ButtonProps> = props => {
  const Icon: React.FC<IconProps> = props => {
    return <i>{props.iconRight || props.iconLeft}</i>
  }
  const button = (
    <StyledButton {...props}>
      <Icon {...props} />
      <span> {props.content}</span>
    </StyledButton>
  )
  return button
}

export default Button

export const StyledButton = styled.a<ButtonProps>`
  display: flex;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 999px;
  background-color: ${({ theme, bgColor }) =>
    bgColor ? theme.colors[bgColor] : theme.colors.primary};
  span {
    color: ${({ theme }) => theme.colors['ghost-white']};
  }
  svg {
    fill: ${({ theme }) => theme.colors['ghost-white']};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors['sapce-cadet']};
  }

  &:disabled {
    span {
      color: ${({ theme }) => theme.colors['black-coral']};
    }
    background-color: ${({ theme }) =>
      `rgba(${theme.rgbColors['black-coral']},0.3)`};
  }
`
