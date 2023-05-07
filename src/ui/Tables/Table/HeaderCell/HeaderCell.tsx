import React from 'react'
import styled, { css } from 'styled-components'
import type CSS from 'csstype'
import Text from '../../../Text'

type HeaderCellProps = {
  width?: string
  textAlign: 'center' | 'left' | 'right' | 'justify'
  textTransform?: CSS.Property.TextTransform
  children: React.ReactNode
}

const HeaderCell: React.FC<HeaderCellProps> = ({ children, textTransform, textAlign, width }) => {
  return (
    <StyledTh width={width}>
      <Text.Title size="s" weight="bold" textTransform={textTransform} textAlign={textAlign} ellipsis>
        {children}
      </Text.Title>
    </StyledTh>
  )
}

export default HeaderCell

const StyledTh = styled.th<{ width?: string }>`
  ${({ width }) => css`
    ${!!width &&
    css`
      width: ${width};
    `}
  `}
`
