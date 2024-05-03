import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { JudicialObservationType } from '@/types/judicial/judicial-observation.type'

const ModalJudicialObservation: yup.SchemaOf<
  Omit<JudicialObservationType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
> = yup.object().shape({
  date: yup.string().required(),
  comment: yup.string().required(),
  judicialCaseFileId: yup.number().required(),
  judicialObsTypeId: yup.number().required(),
  customerHasBankId: yup.number().required(),
})

export const ModalJudicialObservationResolver = yupResolver(ModalJudicialObservation)
