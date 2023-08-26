import { TemplateHasValuesType } from '@/types/extrajudicial/template-has-values.type'

export type TemplateType = {
  id: number
  name: string
  templateJson: string
  templatePhoto: string
  createdAt: Date
  customerId: number
  template_has_values?: TemplateHasValuesType[]
}
