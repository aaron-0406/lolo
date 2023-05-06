import type { HTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import Container from '../Container'
import DropdownItem from '../DropdownItem'
import Text from '../Text'
import emptyFolder from '../../shared/assets/icons/emptyFolder.svg'
import type { SelectItem } from '../Select/interfaces'
import type { DropdownListSize } from './interfaces'

type DropdownListProps<T, K> = HTMLAttributes<HTMLUListElement> & {
  size?: DropdownListSize
  options?: Array<SelectItem<T, K>>
  onSelectItem: (option: SelectItem<T, K>) => void
  value?: T
}

const DropdownList = <T extends string, K extends Record<string, unknown>>(props: DropdownListProps<T, K>) => {
  const { size = 'default', options, onSelectItem, value, ...rest } = props

  return (
    <StyledDropdownList $size={size} {...rest}>
      {options?.length ? (
        options.map((option, key) => {
          return (
            <DropdownItem
              key={key}
              value={option.key}
              size={size}
              text={option.label}
              suffix={option.suffix}
              leadingIcon={option.leadingIcon}
              active={option.key === value}
              trailingIcon={option.trailingIcon}
              onClick={() => onSelectItem(option)}
            />
          )
        })
      ) : (
        <Container
          height="96px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap="16px"
        >
          <img src={emptyFolder} alt="Empty folder" width="58px" height="40px" />

          <Text.Body size="m" weight="regular" className="empty" color="Neutral8">
            No data
          </Text.Body>
        </Container>
      )}
    </StyledDropdownList>
  )
}

export default DropdownList

const StyledDropdownList = styled.ul<{ $size: DropdownListSize }>`
  ${({ theme, $size }) => css`
    width: 100%;
    height: auto;
    background-color: ${theme.colors.Neutral0};
    max-height: ${$size === 'default' ? '280px' : '336px'};
    overflow-y: auto;
    position: absolute;
    padding: 0;
    margin: 4px 0 0 0;
    margin-top: 4px;
    border-radius: 8px;
    border: 2px solid ${theme.colors.Neutral4};
    box-shadow: ${theme.shadows.elevationLow};
    z-index: ${theme.zIndex.dropdown};
  `}
`
