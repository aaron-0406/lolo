import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { JudicialSubjectType } from '@/types/judicial/judicial-subject.type'

const SubjectModal: yup.SchemaOf<Omit<JudicialSubjectType, 'createdAt' | 'id'>> = yup.object().shape({
  subject: yup
    .string()
    .min(1)
    .max(200)
    .required()
    .matches(/^[^\d]+$/),
  customerHasBankId: yup.number().required(),
})

export const ModalSubjectResolver = yupResolver(SubjectModal)
