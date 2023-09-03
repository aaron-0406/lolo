import { yupResolver } from '@hookform/resolvers/yup'
import { FileCaseType } from '@/types/judicial/case-file.type'
import yup from '../../../../shared/yupLocale'

const JudicialFileCaseSchema: yup.SchemaOf<Omit<FileCaseType, 'id' | 'createdAt'>> = yup.object().shape({
  errandCode: yup.string().required().matches(/^\d*$/),
  numberCaseFile: yup.string().required().max(150),
  judgmentNumber: yup.number().required().min(1),
  secretary: yup.string().required().max(150),
  amountDemandedDollars: yup.number().required().min(1),
  amountDemandedSoles: yup.number().required().min(1),
  cautionaryCode: yup.string().required().matches(/^\d*$/),
  clientId: yup.number().required().min(1),
  customerUserId: yup.number().required().min(1),
  demandDate: yup.date().required(),
  judge: yup.string().required().max(150),
  judicialCourtId: yup.number().required().min(1),
  judicialProceduralWayId: yup.number().required().min(1),
  judicialSubjectId: yup.number().required().min(1),
  judicialVenue: yup.string().required().max(150),
})

export const JudicialFileCaseResolver = yupResolver(JudicialFileCaseSchema)
