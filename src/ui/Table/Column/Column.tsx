import React from 'react'
import styled, { css } from 'styled-components'

type ColumnProps = {
  text: string
  width?: string
  align?: 'center' | 'left' | 'right'
}

const Column: React.FC<ColumnProps> = (props) => {
  const { text, width = '100%', align = 'center' } = props
  return (
    <StyledColumn width={width} align={align}>
      {text}
    </StyledColumn>
  )
}

export default Column

const StyledColumn = styled.th<{ width: string; align: string }>`
  padding: 0.75rem 1.25rem;
  text-transform: uppercase;
  ${({ theme, align, width }) => css`
    color: #fff;
    text-align: ${align};
    width: ${width};
    border: 1px solid ${theme.colors.Neutral4};
  `}
`
