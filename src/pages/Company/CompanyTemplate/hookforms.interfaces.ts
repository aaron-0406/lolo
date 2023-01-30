import { ClientType } from "../../../shared/types/client.type";
import { DirectionType } from "../../../shared/types/direction.type";
import { ECampoType } from "../../../shared/types/ecampo.type";
import { GuarantorType } from "../../../shared/types/guarantor.type";
import { TemplateDocument } from "../../../shared/types/template-document.type";
import { TemplateHasValuesType } from "../../../shared/types/template-has-values.type";
import { TemplateType } from "../../../shared/types/template.type";
import { ValueType } from "../../../shared/types/value.type";

export type ClientTypeForm = ClientType & {
  direction: DirectionType[];
  guarantor: GuarantorType[];
  state: boolean;
};

export type TemplateFormType = {
  templates: TemplateType[];
  templateHasValues: TemplateHasValuesType[];
  templateSelected: TemplateType;
  templateHasValuesSelected: TemplateHasValuesType;
  fields: ECampoType[];
  values: ValueType[];
  templateJson: { parrafos: TemplateDocument[] };
  templatePhoto: string;
  clients: ClientTypeForm[];
  clientSelected: ClientTypeForm;
};
