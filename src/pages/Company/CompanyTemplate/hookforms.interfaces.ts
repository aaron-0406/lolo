import { ClientType } from '../../../shared/types/extrajudicial/client.type'
import { DirectionType } from '../../../shared/types/extrajudicial/direction.type'
import { ECampoType } from '../../../shared/types/extrajudicial/ecampo.type'
import { GuarantorType } from '../../../shared/types/extrajudicial/guarantor.type'
import { TemplateDocument } from '../../../shared/types/extrajudicial/template-document.type'
import { TemplateHasValuesType } from '../../../shared/types/extrajudicial/template-has-values.type'
import { TemplateType } from '../../../shared/types/extrajudicial/template.type'
import { ValueType } from '../../../shared/types/extrajudicial/value.type'

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
