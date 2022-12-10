import { ColorsType } from '../../types/theme.type'

export interface ButtonProps {
  content: string
  state?: string
  iconLeft?: string
  iconRight?: string
  isLoading?: boolean
  isDisabled?: boolean
  onClick?: () => void
  onChange?: React.FormEventHandler<HTMLButtonElement>
}
