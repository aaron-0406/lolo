import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import type CSS from 'csstype'
import Text from '@/ui/Text'
import Container from '@/ui/Container'
import Icon from '@/ui/Icon'
import DropdownList from '@/ui/DropdownList'
import { SelectItem } from '@/ui/Select/interfaces'
import ClickOutSideComponent from '@/hooks/useClickOutside'

type HeaderCellProps = {
  width?: string
  justifyContent?: CSS.Property.JustifyContent
  textTransform?: CSS.Property.TextTransform
  children: React.ReactNode
  isThereFilter?: boolean
  options?: Array<SelectItem<any, any>>
  onChangeFilterOptions?: (options: Array<SelectItem<any, any>>) => void
  resetFilters?: boolean
}

const HeaderCell: React.FC<HeaderCellProps> = ({
  children,
  textTransform,
  justifyContent,
  width,
  isThereFilter = false,
  options,
  onChangeFilterOptions,
  resetFilters = false,
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

  useEffect(() => {
    setSelectedFilterOptions([])
  }, [resetFilters])

  return (
    <StyledTh width={width} isThereFilter={isThereFilter} textTransform={textTransform} onClick={onSelectToogle}>
      <ClickOutSideComponent callback={() => setToggleSelect(false)}>
        <Container
          width="100%"
          height="100%"
          display="flex"
          flexDirection="row"
          justifyContent={justifyContent}
          padding="0 16px"
          alignItems="center"
          backgroundColor={toggleSelect ? '#d9dbe9ff' : ''}
        >
          <Text.Body size="m" weight="bold" ellipsis>
            {children}
          </Text.Body>

          {isThereFilter && (
            <Container
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              margin="0 0 0 10px"
              width="60px"
              height="24px"
              className="arrow__icon"
            >
              {selectedFilterOptions.length > 0 ? (
                <Icon
                  size={20}
                  remixClass="ri-delete-bin-line"
                  color="Warning3"
                  onClick={() => {
                    setSelectedFilterOptions([])
                    onChangeFilterOptions?.([])
                  }}
                />
              ) : null}
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
      </ClickOutSideComponent>
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
