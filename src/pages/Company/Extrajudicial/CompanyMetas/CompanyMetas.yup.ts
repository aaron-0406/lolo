import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../shared/yupLocale'

const CompanyGoalSchema: yup.SchemaOf<{ goal: {} }> = yup.object().shape({
  goal: yup.object().shape({
    startDate: yup.string().required(),
    week: yup.number().required().min(1),
  }),
})

export const CompanyGoalResolver = yupResolver(CompanyGoalSchema)
