import React from 'react'
import type CSS from 'csstype'
import Text from '../../../Text'

type BodyCellProps = {
  width?: string
  textAlign: 'center' | 'left' | 'right' | 'justify'
  textTransform?: CSS.Property.TextTransform
  children: React.ReactNode
}

const BodyCell: React.FC<BodyCellProps> = ({ children, textTransform, textAlign }) => {
  return (
    <td>
      <Text.Body size="s" weight="regular" ellipsis>
        {children}
      </Text.Body>
    </td>
  )
}

export default BodyCell
