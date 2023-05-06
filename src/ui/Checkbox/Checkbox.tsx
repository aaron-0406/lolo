import type { ChangeEvent } from 'react'
import styled, { css } from 'styled-components'

type CheckboxProps<T> = React.HTMLProps<HTMLInputElement> & {
  data?: T
  onChange?: (event: ChangeEvent<HTMLInputElement>, extra?: T) => void
}

const Checkbox = <T,>(props: CheckboxProps<T>) => {
  const { data, onChange, children, ...rest } = props

  const onCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event, data)
  }

  return (
    <StyledCheckbox className="container">
      {children}
      <input {...rest} type="checkbox" onChange={onCheckboxChange} />
      <span className="checkmark" />
    </StyledCheckbox>
  )
}

export default Checkbox

const StyledCheckbox = styled.label`
  ${({ theme }) => css`
    &.container {
      display: block;
      position: relative;
      height: 24px;
      padding-left: 28px;
      cursor: pointer;
      font-size: 15px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }

      .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 24px;
        width: 24px;
        border: 2px solid ${theme.colors.Neutral4};
        border-radius: 4px;
      }

      .checkmark:after {
        content: '';
        position: absolute;
        display: none;
      }

      span {
        white-space: nowrap;
        line-height: 24px;
      }
    }

    &.container:hover input ~ .checkmark {
      border: 2px solid ${theme.colors.Primary5};
    }

    &.container:hover input:checked ~ .checkmark {
      background-color: ${theme.colors.Primary4};
      border: 2px solid ${theme.colors.Primary4};
    }

    &.container input:active ~ .checkmark {
      background-color: ${theme.colors.Primary3};
      border: 2px solid ${theme.colors.Primary5};
    }

    &.container input:active:checked ~ .checkmark {
      background-color: ${theme.colors.Primary3};
      border: 2px solid ${theme.colors.Primary3};
    }

    &.container input:checked ~ .checkmark {
      background-color: ${theme.colors.Primary5};
      border: 2px solid ${theme.colors.Primary5};
    }

    &.container input:checked ~ .checkmark:hover {
      background-color: ${theme.colors.Primary4};
      border: 2px solid ${theme.colors.Primary4};
    }

    &.container input[disabled]:checked ~ .checkmark {
      background-color: ${theme.colors.Neutral4};
      border: 2px solid ${theme.colors.Neutral4};
    }

    &.container input[disabled] ~ .checkmark {
      background-color: ${theme.colors.Neutral3};
      border: 2px solid ${theme.colors.Neutral4};
    }

    &.container input:checked ~ .checkmark:after {
      display: block;
    }

    &.container .checkmark:after {
      left: 7px;
      top: 2px;
      width: 5px;
      height: 10px;
      border: solid ${theme.colors.Neutral0};
      border-width: 0 2px 2px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  `}
`
