import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import type CSS from 'csstype'
import Text from '../../../Text'
import Container from '../../../Container'
import Icon from '../../../Icon'
import DropdownList from '../../../DropdownList'
import { SelectItem } from '../../../Select/interfaces'

type HeaderCellProps = {
  width?: string
  justifyContent?: CSS.Property.JustifyContent
  textTransform?: CSS.Property.TextTransform
  children: React.ReactNode
  isThereFilter?: boolean
  options?: Array<SelectItem<any, any>>
  onChangeFilterOptions?: (options: Array<SelectItem<any, any>>) => void
}

const HeaderCell: React.FC<HeaderCellProps> = ({
  children,
  textTransform,
  justifyContent,
  width,
  isThereFilter = false,
  options,
  onChangeFilterOptions,
}) => {
  const [toggleSelect, setToggleSelect] = useState<boolean>(false)
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<Array<SelectItem<any, any>>>([])

  const onSelectToogle = () => {
    if (isThereFilter) {
      setToggleSelect(!toggleSelect)
    } else {
      setToggleSelect(false)
    }
  }

  const onSelectItem = (option: SelectItem<any, any>) => {
    const position = selectedFilterOptions.indexOf(option)

    if (position === -1) {
      setSelectedFilterOptions((prev) => {
        const filterOptions = [...prev, option]
        onChangeFilterOptions?.(filterOptions)
        return filterOptions
      })
    } else {
      setSelectedFilterOptions((prev) => {
        const filterOptions = prev.filter((filterOption) => filterOption.key !== option.key)
        onChangeFilterOptions?.(filterOptions)
        return filterOptions
      })
    }
  }

  return (
    <StyledTh width={width} isThereFilter={isThereFilter} textTransform={textTransform} onClick={onSelectToogle}>
      <Container
        width="100%"
        height="100%"
        display="flex"
        flexDirection="row"
        justifyContent={justifyContent}
        padding="0 16px"
        alignItems="center"
      >
        <Text.Body size="m" weight="bold" ellipsis>
          {children}
        </Text.Body>

        {isThereFilter && (
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
        )}
      </Container>

      {toggleSelect && (
        <DropdownList
          onSelectItem={onSelectItem}
          options={options}
          value={selectedFilterOptions}
          top="50px"
          withCheckbox={isThereFilter}
        />
      )}
    </StyledTh>
  )
}

export default HeaderCell

const StyledTh = styled.th<HeaderCellProps>`
  ${({ width, textTransform, isThereFilter }) => css`
    ${!!width &&
    css`
      width: ${width};
    `}

    ${!!isThereFilter &&
    css`
      .arrow__icon {
        float: right;
      }
    `}

    ${!!textTransform &&
    css`
      text-transform: ${textTransform};
    `}
  `}
`
