import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
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
