import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { JudicialObsTypeType } from '@/types/judicial/judicial-obs-type.type'

const ModalObsType: yup.SchemaOf<Omit<JudicialObsTypeType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>> = yup
  .object()
  .shape({
    type: yup.string().required().min(3).max(200),
    customerHasBankId: yup.number().required(),
  })

export const ModalObsTypeResolver = yupResolver(ModalObsType)
