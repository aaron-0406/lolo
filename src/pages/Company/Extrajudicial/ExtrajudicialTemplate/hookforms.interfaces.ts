import { ClientType } from '@/types/extrajudicial/client.type'
import { DirectionType } from '@/types/extrajudicial/direction.type'
import { ECampoType } from '@/types/extrajudicial/ecampo.type'
import { GuarantorType } from '@/types/extrajudicial/guarantor.type'
import { TemplateDocument } from '@/types/extrajudicial/template-document.type'
import { TemplateHasValuesType } from '@/types/extrajudicial/template-has-values.type'
import { TemplateType } from '@/types/extrajudicial/template.type'
import { ValueType } from '@/types/extrajudicial/value.type'

export type ClientTypeForm = ClientType & {
  direction: DirectionType[]
  guarantor: GuarantorType[]
  state: boolean
}

export type TemplateFormType = {
  templates: TemplateType[]
  templateHasValues: TemplateHasValuesType[]
  templateSelected: TemplateType
  templateHasValuesSelected: TemplateHasValuesType
  fields: ECampoType[]
  values: ValueType[]
  templateJson: { parrafos: TemplateDocument[] }
  templatePhoto: string
  clients: ClientTypeForm[]
  clientSelected: ClientTypeForm
}
