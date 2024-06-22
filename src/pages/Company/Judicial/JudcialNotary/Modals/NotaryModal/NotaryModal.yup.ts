import { yupResolver } from '@hookform/resolvers/yup'
import { JudicialNotaryType } from '@/types/judicial/judicial-notary.type'
import yup from '../../../../../../shared/yupLocale'

const JudicialNotarySchema: yup.SchemaOf<
  Omit<JudicialNotaryType, 'createdAt' | 'updatedAt' | 'deletedAt'>
> = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
  customerHasBankId: yup.number().required(),
})

export const JudicialNotaryResolver = yupResolver(JudicialNotarySchema)