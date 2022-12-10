import styled, { css } from 'styled-components'

type InputState = 'danger' | 'warning' | 'success'

interface InputProps {
  state?: InputState
  size?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
  type?: string
  inputID?: string
  labelValue?: string
  name?: string
  hiddenLabel?: boolean
  helperText?: string
  isDisabled?: boolean
  isOptional?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  className?: string
}

export const Input: React.FC<InputProps> = props => {
  const getIconClass = (state: InputState) => {
    const options = {
      success: 'ri-checkbox-circle-line',
      warning: 'ri-alert-line',
      danger: 'ri-error-warning-line'
    }
    return options[state]
  }

  return (
    <StyledInput {...props}>
      {!props.hiddenLabel && (
        <label htmlFor={props.inputID}>
          {props.labelValue}
          {props.isOptional && (
            <span className='optional'>
              <i className='ri-information-line'></i>(opcional)
            </span>
          )}
        </label>
      )}
      <div className='inputWrapper'>
        <input
          type={props.type || 'text'}
          id={props.inputID}
          name={props.name}
          disabled={props.isDisabled}
          onChange={props.onChange}
        />
        {props.state && !props.isDisabled && (
          <span className='icon icon__state'>
            <i className={getIconClass(props.state)}></i>
          </span>
        )}
      </div>
      {props.helperText && (
        <span className='helperText'>{props.helperText}</span>
      )}
    </StyledInput>
  )
}

const StyledInput = styled.div<Omit<InputProps, 'onChange'>>`
  font-size: ${({ size }) => (size === 'small' ? '14px' : '16px')};
  width: ${({ fullWidth }) => fullWidth && '100%'};

  &:has(.inputWrapper > input:focus) {
    .inputWrapper {
      border: 2px solid ${({ theme }) => theme.colors.primary};
    }

    .helperText {
      color: ${({ theme }) => theme.colors.primary};
    }

    ${({ theme, state }) =>
      state &&
      css`
        .inputWrapper {
          border: 2px solid ${theme.colors[state]};
        }

        .helperText {
          color: ${theme.colors[state]};
        }
      `}
  }

  &:has(.inputWrapper > input:disabled) {
    color: ${({ theme }) => theme.colors['cadet-blue-crayola']};

    label {
      .optional {
        color: inherit;
      }
    }

    .inputWrapper {
      border: 2px solid ${({ theme }) => theme.colors['black-coral']};
      background-color: ${({ theme }) => theme.colors.purple};
    }

    .helperText {
      color: inherit;
    }
  }

  label {
    display: inline-block;
    margin-bottom: 5px;

    ${({ isOptional }) =>
      isOptional &&
      css`
        .optional {
          display: inline-flex;
          align-items: flex-end;
          gap: 3px;
          margin-left: 3px;
          font-size: 14px;
          color: ${({ theme }) => theme.colors['sapce-cadet']};
        }
      `}
  }

  .inputWrapper {
    display: flex;
    border-radius: 5px;
    width: 100%;
    padding: 0 10px;
    border: 2px solid ${({ theme }) => theme.colors['blue-yonder']};
    height: ${({ size }) =>
      size === 'large' ? '52px' : size === 'small' ? '36px' : '44px'};

    ${({ theme, state }) =>
      state &&
      css`
        background-color: ${theme.colors[state]}26;
        border: 2px solid ${theme.colors[state]}D9;
      `}

    input {
      outline: none;
      border-radius: inherit;
      height: 100%;
      width: 100%;
      background-color: transparent;
    }

    .icon {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;

      &__state {
        color: ${({ theme, state }) => state && theme.colors[state]};
      }
    }
  }

  .helperText {
    font-size: ${({ size }) => (size === 'small' ? '12px' : '14px')};
    color: ${({ theme, state }) => state && `${theme.colors[state]}D9`};
  }
`
