import { ColorsType } from '../../types/theme.type'

export interface ButtonProps {
  content: string
  state?: string
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  onClick?: () => void
  bgColor?: ColorsType
}

export interface IconProps {
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}
