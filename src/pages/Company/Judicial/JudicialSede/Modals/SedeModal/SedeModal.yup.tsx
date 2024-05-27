import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { JudicialSedeType } from '@/types/judicial/judicial-sede.type'

const ModalSede: yup.SchemaOf<Omit<JudicialSedeType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>> = yup
  .object()
  .shape({
    sede: yup.string().required().min(3).max(200),
    customerHasBankId: yup.number().required(),
  })

export const ModalSedeResolver = yupResolver(ModalSede)
