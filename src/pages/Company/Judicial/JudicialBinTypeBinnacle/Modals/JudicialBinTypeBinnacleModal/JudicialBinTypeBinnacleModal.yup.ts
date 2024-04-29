import { JudicialBinTypeBinnacleType } from '@/types/judicial/judicial-bin-type-binnacle.type'
import { yupResolver } from '@hookform/resolvers/yup'
import yup from 'shared/yupLocale'

const JudicialBinTypeBinnacleModalSchema: yup.SchemaOf<
  Omit<JudicialBinTypeBinnacleType, 'createdAt' | 'updatedAt' | 'deletedAt' | 'id'>
> = yup.object().shape({
  typeBinnacle: yup
    .string()
    .min(1)
    .max(200)
    .required()
    .matches(/^[^\d]+$/),
  customerHasBankId: yup.number().required(),
})

export const ModalJudicialBinTypeBinnacleResolver = yupResolver(JudicialBinTypeBinnacleModalSchema)
