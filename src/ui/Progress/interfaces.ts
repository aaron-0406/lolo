import type CSS from 'csstype'
import { MouseEventHandler } from 'react'

export interface ProgressProps {
  bgColorInit?: CSS.Property.BackgroundColor
  bgColorMid?: CSS.Property.BackgroundColor
  bgColorEnd?: CSS.Property.BackgroundColor
  width?: CSS.Property.Width
  value?: number
  quantity?: number
  onClick?: MouseEventHandler<HTMLDivElement>
}
