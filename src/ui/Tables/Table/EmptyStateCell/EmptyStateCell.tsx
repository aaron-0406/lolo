import React from 'react'
import styled from 'styled-components'

type EmptyStateCellProps = {
  colSpan: number
  children: React.ReactNode
}

const EmptyStateCell: React.FC<EmptyStateCellProps> = ({ children, colSpan }) => {
  return (
    <StyledTr role="row-empty" className="row-empty">
      <td className="row-empty-state" colSpan={colSpan}>
        {children}
      </td>
    </StyledTr>
  )
}

export default EmptyStateCell

const StyledTr = styled.tr`
  .row-empty-state:hover {
    cursor: default;
  }
`
