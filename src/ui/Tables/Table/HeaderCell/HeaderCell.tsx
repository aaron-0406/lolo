import React from 'react'
import styled, { css } from 'styled-components'
import type CSS from 'csstype'
import Text from '../../../Text'

type HeaderCellProps = {
  width?: string
  textAlign: CSS.Property.TextAlign
  textTransform?: CSS.Property.TextTransform
  children: React.ReactNode
}

const HeaderCell: React.FC<HeaderCellProps> = ({ children, textTransform, textAlign, width }) => {
  return (
    <StyledTh width={width} textAlign={textAlign} textTransform={textTransform}>
      <Text.Body size="m" weight="bold" ellipsis>
        {children}
      </Text.Body>
    </StyledTh>
  )
}

export default HeaderCell

const StyledTh = styled.th<HeaderCellProps>`
  ${({ width, textAlign, textTransform }) => css`
    ${!!width &&
    css`
      width: ${width};
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
