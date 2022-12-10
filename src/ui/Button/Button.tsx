import styled from 'styled-components'

import { ButtonProps } from './button.interface'

const Button: React.FC<ButtonProps> = props => {
  const button = (
    <StyledButton
      {...props}
      onChange={props.onChange}
      disabled={props.isDisabled || props.isLoading}
    >
      {props.iconRight && (
        <i
          className={
            props.isLoading ? 'ri-loader-4-line' : `${props.iconRight}`
          }
        ></i>
      )}
      <span>{props.content}</span>
      {props.iconLeft && <i className={`${props.iconLeft}`}></i>}
    </StyledButton>
  )
  return button
}

export default Button

export const StyledButton = styled.button<Omit<ButtonProps, 'onChange'>>`
  display: flex;
  gap: 6px;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 999px;
  background-color: ${({ theme, isLoading }) =>
    isLoading ? `rgba(${theme.rgbColors.primary},0.7)` : theme.colors.primary};
  color: ${({ theme }) => theme.colors['ghost-white']};

  &:hover {
    background-color: ${({ theme }) => `rgba(${theme.rgbColors.primary},0.7)`};
  }

  &:active {
    background-color: ${({ theme, isLoading }) =>
      !isLoading && theme.colors['sapce-cadet']};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: ${({ isLoading }) => !isLoading && 0.7};
    color: ${({ theme, isLoading }) =>
      !isLoading && theme.colors['black-coral']};
    background-color: ${({ theme, isLoading }) =>
      !isLoading && `rgba(${theme.rgbColors['black-coral']},0.3)`};
  }
`
