import { yupResolver } from '@hookform/resolvers/yup'
import { JudicialRegisterOfficeType } from '@/types/judicial/judicial-register-office.type'
import yup from '../../../../../../shared/yupLocale'

const JudicialRegisterOfficeSchema: yup.SchemaOf<
  Omit<JudicialRegisterOfficeType, 'createdAt' | 'updatedAt' | 'deletedAt'>
> = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
  customerHasBankId: yup.number().required(),
})

export const JudicialRegisterOfficeResolver = yupResolver(JudicialRegisterOfficeSchema)