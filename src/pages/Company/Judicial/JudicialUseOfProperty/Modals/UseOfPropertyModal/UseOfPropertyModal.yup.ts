import { yupResolver } from '@hookform/resolvers/yup'
import { JudicialUseOfPropertyType } from '@/types/judicial/judicial-use-of-property.type'
import yup from '../../../../../../shared/yupLocale'

const JudicialUseOfPropertySchema: yup.SchemaOf<
  Omit<JudicialUseOfPropertyType, 'createdAt' | 'updatedAt' | 'deletedAt'>
> = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
  customerHasBankId: yup.number().required(),
})

export const JudicialUseOfPropertyResolver = yupResolver(JudicialUseOfPropertySchema)