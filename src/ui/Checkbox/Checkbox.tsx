import styled from 'styled-components'
import { CheckboxProps } from './checkbox.interface'

const Checkbox: React.FC<CheckboxProps> = props => {
  return (
    <StyledCheckbox isDisabled={props.isDisabled} {...props}>
      <input
        className='hidden-checkbox'
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        disabled={props.isDisabled}
      />
      <div className='visible-checkbox'>
        <i
          className={
            props.type === 'checkbox'
              ? 'ri-check-line'
              : 'ri-checkbox-blank-circle-fill'
          }
        ></i>
      </div>
    </StyledCheckbox>
  )
}

export default Checkbox

export const StyledCheckbox = styled.label<Omit<CheckboxProps, 'onChange'>>`
  .hidden-checkbox {
    display: none;
  }
  .visible-checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      visibility: hidden;
    }
  }
  .hidden-checkbox + .visible-checkbox {
    width: 20px;
    height: 20px;
    background-color: ${({ theme, isDisabled }) =>
      isDisabled && `rgba(${theme.rgbColors['black-coral']},0.5)`};
    border: ${({ theme, isDisabled }) =>
      isDisabled
        ? `2px solid rgba(${theme.rgbColors['black-coral']},0.9)`
        : `2px solid rgba(${theme.rgbColors['black-coral']},0.2)`};
    border-radius: ${({ type }) => (type === 'radio' ? '999px' : '6px')};
    box-sizing: border-box;
    &:hover {
      border-color: ${({ theme, isDisabled }) =>
        !isDisabled && theme.colors.primary};
    }
    &:active {
      border-color: ${({ theme, isDisabled }) =>
        !isDisabled && theme.colors.primary};
      background-color: ${({ theme, isDisabled }) =>
        !isDisabled && `rgba(${theme.rgbColors.primary},0.5)`};
    }
  }
  .hidden-checkbox:checked + .visible-checkbox {
    font-size: ${({ type }) => type === 'radio' && '10px'};
    color: ${({ theme }) => theme.colors['ghost-white']};
    background-color: ${({ theme, isDisabled }) =>
      isDisabled ? theme.colors['black-coral'] : theme.colors.primary};
    border-color: ${({ theme, isDisabled }) =>
      isDisabled ? theme.colors['black-coral'] : theme.colors.primary};
    i {
      visibility: visible;
    }
    &:hover {
      opacity: ${({ isDisabled }) => !isDisabled && 0.8};
    }
    &:active {
      opacity: ${({ isDisabled }) => !isDisabled && 0.65};
    }
  }
  .hidden-checkbox:disabled + .visible-checkbox {
    cursor: not-allowed;
    opacity: 0.3;
  }
`
