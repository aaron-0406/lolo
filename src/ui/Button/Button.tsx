import styled from 'styled-components'
import { Link } from 'react-router-dom'

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
  return (
    <>{props.link && props.to ? <Link to={props.to}>{button}</Link> : button}</>
  )
}

export default Button

export const StyledButton = styled.button<Omit<ButtonProps, 'onChange'>>`
  display: flex;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: ${({ size }) =>
    size === 'sm' ? '12px' : size === 'md' ? '14px' : '16px'};
  background-color: ${({ theme, isLoading, link }) =>
    link
      ? 'transparent'
      : isLoading
      ? `rgba(${theme.rgbColors.primary},0.7)`
      : theme.colors.primary};
  color: ${({ theme, link, state }) =>
    link
      ? state
        ? theme.colors[state]
        : theme.colors.primary
      : theme.colors['ghost-white']};

  &:hover {
    color: ${({ theme, state }) =>
      state
        ? `rgba(${theme.rgbColors[state]},0.7)`
        : `rgba(${theme.rgbColors.primary},0.7)`};
    background-color: ${({ theme, link }) =>
      !link && `rgba(${theme.rgbColors.primary},0.7)`};
  }

  &:active {
    color: ${({ theme, isLoading }) =>
      !isLoading && theme.colors['sapce-cadet']};
    background-color: ${({ theme, isLoading, link }) =>
      !link && !isLoading && theme.colors['sapce-cadet']};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: ${({ isLoading }) => !isLoading && 0.7};
    color: ${({ theme, isLoading, link }) =>
      !isLoading && theme.colors['black-coral']};
    background-color: ${({ theme, link, isLoading }) =>
      !link && !isLoading && `rgba(${theme.rgbColors['black-coral']},0.3)`};
  }
`
