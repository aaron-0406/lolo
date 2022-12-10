import { ButtonSizes, ButtonStates } from './button.type'

export interface ButtonProps {
  content: string
  size?: ButtonSizes
  state?: ButtonStates
  iconLeft?: string
  link?: boolean
  to?: string
  iconRight?: string
  isLoading?: boolean
  isDisabled?: boolean
  onClick?: () => void
  onChange?: React.FormEventHandler<HTMLButtonElement>
}
