import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { JudicialProcessReasonType } from '@/types/judicial/judicial-process-reason.types'

const ProcessReasonModal: yup.SchemaOf<Omit<JudicialProcessReasonType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>> = yup.object().shape({
  reason: yup
    .string()
    .min(1)
    .max(200)
    .required()
    .matches(/^[^\d]+$/),
  customerHasBankId: yup.number().required(),
})

export const ModalProcessReasonResolver = yupResolver(ProcessReasonModal)
