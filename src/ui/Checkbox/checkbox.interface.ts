import { CheckboxTypes } from './checkbox.type'

export interface CheckboxProps {
  type: CheckboxTypes
  isDisabled?: boolean
  value?: string | number
  onChange?: () => void
}
