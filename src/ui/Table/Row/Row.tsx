import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'

type RowProps = {
  children: ReactNode
  center?: boolean
  bold?: boolean
}

const Row: React.FC<RowProps> = ({ children, center = false, bold = false }) => {
  return (
    <StyledRow bold={bold} center={center}>
      {children}
    </StyledRow>
  )
}

export default Row

const StyledRow = styled.td<{ center: boolean; bold: boolean }>`
  ${({ theme, center, bold }) => css`
    border: 1px solid ${theme.colors.Neutral4};
    border-top-width: 0px;
    color: ${theme.colors.Primary6};
    white-space: nowrap;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    text-align: ${center ? 'center' : ''};
    width: 2.5rem;
    height: 1rem;
    font-weight: ${bold ? 'bold' : '500'};
    font-size: 16px;
    letter-spacing: 0.05em;
    word-break: break-all;
  `}
`
