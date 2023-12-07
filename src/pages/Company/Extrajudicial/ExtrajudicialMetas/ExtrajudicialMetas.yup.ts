import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../shared/yupLocale'

const ExtrajudicialGoalSchema: yup.SchemaOf<{ goal: {} }> = yup.object().shape({
  goal: yup.object().shape({
    name: yup
      .string()
      .required()
      .min(3)
      .max(200)
      .matches(/^[^\d]+$/),
    startDate: yup.string().required(),
    week: yup.number().required().min(1),
  }),
})

export const ExtrajudicialGoalResolver = yupResolver(ExtrajudicialGoalSchema)
