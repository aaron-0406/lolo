import type { HelperTextProps } from '../HelperText'
import type { LabelProps } from '../Label'

export type LabelFieldProps = Pick<
  LabelProps,
  'label' | 'disabled' | 'optional' | 'required' | 'tooltipMessage' | 'name'
>

export type HelperFieldProps = Pick<HelperTextProps, 'wrap' | 'hasError' | 'disabled' | 'charactersLimit'> & {
  helperText?: string
}
