import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { JudicialCourtType } from '@/types/judicial/judicial-court.type'

const CourtModal: yup.SchemaOf<Omit<JudicialCourtType, 'id'>> = yup.object().shape({
  court: yup
    .string()
    .min(1)
    .max(200)
    .required()
    .matches(/^[^\d]+$/),
  customerHasBankId: yup.number().required(),
})

export const ModalCourtResolver = yupResolver(CourtModal)
