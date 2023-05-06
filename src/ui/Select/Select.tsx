import { useEffect, useState } from 'react'
import type { HTMLAttributes } from 'react'
import type CSS from 'csstype'
import styled, { css } from 'styled-components'
import Container from '../Container'
import DropdownList from '../DropdownList'
import HelperText from '../HelperText'
import Icon from '../Icon'
import Text from '../Text'
import type { HelperFieldProps, LabelFieldProps } from '../fields/interfaces'
import InputLabel from '../Label'
import type { SelectItem, SelectSize } from './interfaces'

type SelectProps<T, K> = LabelFieldProps &
  HelperFieldProps &
  Omit<HTMLAttributes<HTMLUListElement>, 'onChange' | 'value'> & {
    width?: string
    size?: SelectSize
    options?: Array<SelectItem<T, K>>
    value?: T
    onChange?: (value: T, option: SelectItem<T, K>) => void
  }

const Select = <T extends string, K extends Record<string, unknown>>(props: SelectProps<T, K>) => {
  const {
    wrap,
    helperText,
    disabled,
    label,
    width,
    size = 'default',
    hasError = false,
    tooltipMessage,
    optional,
    required,
    options,
    value,
    placeholder,
    onChange,
    defaultValue,
    ...rest
  } = props

  const [state, setState] = useState<SelectItem<T, K> | undefined>({
    key: defaultValue as T,
    label: options?.find((option) => option.key === value || option.key === defaultValue)?.label as T,
  })

  const [toggleSelect, setToggleSelect] = useState<boolean>(false)

  const onSelectToogle = () => {
    if (!disabled) {
      setToggleSelect(!toggleSelect)
    } else {
      setToggleSelect(false)
    }
  }

  const onSelectItem = (option: SelectItem<T, K>) => {
    setState(option)
    onChange?.(option.key, option)
  }

  useEffect(() => {
    if (value) {
      setState({
        key: value,
        label: options?.find((option) => option.key === value)?.label as T,
      })
    }
    // eslint-disable-next-line
  }, [value])

  return (
    <StyledWrapper width={width}>
      {label && (
        <InputLabel
          name={rest.name}
          label={label}
          tooltipMessage={tooltipMessage}
          required={required}
          optional={optional}
          disabled={disabled}
        />
      )}

      <Container position="relative" onClick={onSelectToogle} tabIndex={0}>
        <StyledSelect $size={size} $hasError={hasError} $disabled={disabled} tabIndex={1}>
          <Text.Body
            size={size === 'default' ? 'm' : 'l'}
            weight="regular"
            className="select__text"
            color={disabled ? 'Neutral5' : 'Neutral8'}
            ellipsis
          >
            {!state?.label || !value ? placeholder : state?.label}
          </Text.Body>

          <Container display="flex" alignItems="center" gap="8px">
            {options && state && (
              <Text.Body size="m" weight="regular" className="suffix__text">
                {state.suffix}
              </Text.Body>
            )}

            <Container
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="24px"
              height="24px"
              className="arrow__icon"
            >
              <Icon size={20} remixClass="ri-arrow-down-s-line" color="Neutral6" />
            </Container>
          </Container>
        </StyledSelect>

        {toggleSelect && (
          <DropdownList
            value={state?.key ?? value}
            options={options}
            onSelectItem={onSelectItem}
            size={size}
            {...rest}
          />
        )}
      </Container>

      <HelperText wrap={wrap} hasError={hasError} disabled={disabled} width={width}>
        {helperText}
      </HelperText>
    </StyledWrapper>
  )
}

export default Select

const StyledSelect = styled.div<{
  $disabled?: boolean
  $hasError?: boolean
  $size: SelectSize
}>`
  ${({ theme, $disabled, $hasError, $size }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: auto;
    height: ${$size === 'default' ? '40px' : '48px'};
    background: ${theme.colors.Neutral0};
    border: 2px solid ${theme.colors.Neutral4};
    border-radius: 8px;
    padding: 8px 12px;
    gap: 8px;
    transition: border 0.3s;
    cursor: default;

    .suffix__text {
      color: ${theme.colors.Neutral6};
    }

    .select__text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .arrow__icon {
      i {
        color: ${theme.colors.Neutral6};
      }
    }

    :hover,
    :active,
    :focus-within {
      border: 2px solid ${theme.colors.Primary5};
    }

    ${$hasError &&
    css`
      background: ${theme.colors.Danger1};
      border: 2px solid ${theme.colors.Danger5};

      .arrow__icon {
        color: ${theme.colors.Danger5};
      }

      :hover,
      :focus-within {
        border: 2px solid ${theme.colors.Danger5};
      }
    `}

    ${$disabled &&
    css`
      background: ${theme.colors.Neutral3};
      border: 2px solid ${theme.colors.Neutral4};

      :focus-within,
      :hover {
        border: 2px solid ${theme.colors.Neutral4};
      }
    `}
  `}
`

const StyledWrapper = styled.div<{ width?: CSS.Property.Width }>`
  ${({ theme, width }) => css`
    width: ${!!width ? width : 'auto'};
    display: flex;
    flex-direction: column;
    gap: 4px;
    color: ${theme.colors.Neutral6};
  `}
`
