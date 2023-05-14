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
  textAlign: CSS.Property.TextAlign
  textTransform?: CSS.Property.TextTransform
  children: React.ReactNode
  isThereFilter?: boolean
}

const HeaderCell: React.FC<HeaderCellProps> = ({
  children,
  textTransform,
  textAlign,
  width,
  isThereFilter = false,
}) => {
  const [toggleSelect, setToggleSelect] = useState<boolean>(false)

  const onSelectToogle = () => {
    if (isThereFilter) {
      setToggleSelect(!toggleSelect)
    } else {
      setToggleSelect(false)
    }
  }

  return (
    <StyledTh
      width={width}
      textAlign={textAlign}
      isThereFilter={isThereFilter}
      textTransform={textTransform}
      onClick={onSelectToogle}
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

      {toggleSelect && <DropdownList onSelectItem={() => {}} />}
    </StyledTh>
  )
}

export default HeaderCell

const StyledTh = styled.th<HeaderCellProps>`
  ${({ width, textAlign, textTransform, isThereFilter }) => css`
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

    ${!!textAlign &&
    css`
      text-align: ${textAlign};
    `}

    ${!!textTransform &&
    css`
      text-transform: ${textTransform};
    `}
  `}
`
