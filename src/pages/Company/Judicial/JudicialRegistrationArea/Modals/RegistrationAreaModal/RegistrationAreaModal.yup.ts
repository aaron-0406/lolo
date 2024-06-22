import { yupResolver } from '@hookform/resolvers/yup'
import { JudicialRegistrationAreaType } from '@/types/judicial/judicial-registration-area.type'
import yup from '../../../../../../shared/yupLocale'

const JudicialRegistrationAreaSchema: yup.SchemaOf<
  Omit<JudicialRegistrationAreaType, 'createdAt' | 'updatedAt' | 'deletedAt'>
> = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
  customerHasBankId: yup.number().required(),
})

export const JudicialRegistrationAreaResolver = yupResolver(JudicialRegistrationAreaSchema)