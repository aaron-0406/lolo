import type { ButtonClassType } from '@/ui/Button/interfaces'

export type FloatingContainerButtonsType = {
  onClick: () => void
  label: string
  type?: ButtonClassType
}

export type FloatingContainerType = {
  buttons: FloatingContainerButtonsType[]
  onClose: () => void
  numberItems: number
}
