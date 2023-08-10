import React from 'react'
import styled, { css } from 'styled-components'
import type CSS from 'csstype'
import Text from '../../Text'

type BodyCellProps = {
  textAlign?: CSS.Property.TextAlign
  textTransform?: CSS.Property.TextTransform
  children: React.ReactNode
}

const BodyCell: React.FC<BodyCellProps> = ({ children, textTransform, textAlign }) => {
  return (
    <StyledTd textAlign={textAlign} textTransform={textTransform}>
      <Text.Body size="s" weight="regular" ellipsis>
        {children}
      </Text.Body>
    </StyledTd>
  )
}

export default BodyCell

const StyledTd = styled.td<BodyCellProps>`
  ${({ textAlign, textTransform }) => css`
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
