import styled, { css } from 'styled-components'

interface InputProps {
  state?: 'danger' | 'warning' | 'success'
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
        {props.state === 'danger' && (
          <span className='stateIcon stateIcon__error'>
            <i className='ri-error-warning-line'></i>
          </span>
        )}

        {props.state === 'success' && (
          <span className='stateIcon stateIcon__success'>
            <i className='ri-checkbox-circle-line'></i>
          </span>
        )}
        {props.state === 'warning' && (
          <span className='stateIcon stateIcon__warning'>
            <i className='ri-alert-line'></i>
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

    ${({ state }) =>
      state === 'danger' &&
      css`
        .inputWrapper {
          border: 2px solid #ff1e32;
        }

        .helperText {
          color: #ff1e32;
        }
      `}

    ${({ state }) =>
      state === 'success' &&
      css`
        .inputWrapper {
          border: 2px solid #28e146;
        }

        .helperText {
          color: #28e146;
        }
      `}
    
    ${({ state }) =>
      state === 'warning' &&
      css`
        .inputWrapper {
          border: 2px solid #ffdf00;
        }

        .helperText {
          color: #ffdf00;
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
      background-color: ${({ theme }) => theme.colors.purple};
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

    ${({ state }) =>
      state === 'danger' &&
      css`
        background-color: #ff0a0a26;
        border: 2px solid #ff1e32d9;
      `}

    ${({ state }) =>
      state === 'success' &&
      css`
        background-color: #28e14626;
        border: 2px solid #28e146d9;
      `}
    
    ${({ state }) =>
      state === 'warning' &&
      css`
        background-color: #ffdf0026;
        border: 2px solid #ffdf00d9;
      `}

    input {
      outline: none;
      border-radius: inherit;
      height: 100%;
      width: 100%;
      background-color: transparent;
    }

    .stateIcon {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;

      &__error {
        color: #ff1e32;
      }

      &__success {
        color: #28e146;
      }

      &__warning {
        color: #ffdf00;
      }
    }
  }

  .helperText {
    font-size: ${({ size }) => (size === 'small' ? '12px' : '14px')};

    ${({ state }) =>
      state === 'danger' &&
      css`
        color: #ff1e32d9;
      `}

    ${({ state }) =>
      state === 'success' &&
      css`
        color: #28e146d9;
      `}
    
    ${({ state }) =>
      state === 'warning' &&
      css`
        color: #ffdf00d9;
      `}
  }
`
