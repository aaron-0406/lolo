import styled from 'styled-components'

import { ButtonProps } from './button.interface'

const Button: React.FC<ButtonProps> = props => {
  return <StyledButton {...props}>{props.content}</StyledButton>
}

export default Button

export const StyledButton = styled.button<ButtonProps>`
  display: flex;
  background-color: ${({ theme, bgColor }) => bgColor && theme.colors[bgColor]};
`
