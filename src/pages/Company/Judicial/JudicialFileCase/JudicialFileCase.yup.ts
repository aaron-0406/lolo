import { yupResolver } from '@hookform/resolvers/yup'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import yup from '../../../../shared/yupLocale'
const regexPatternNumberFileCase = /^\d{4}-\d{4}-\d{1,4}-\d{4}-[A-Z]{2}-[A-Z]{2}-\d{2}$/

const JudicialFileCaseSchema: yup.SchemaOf<Omit<JudicialCaseFileType, 'id' | 'createdAt'>> = yup.object().shape({
  errandCode: yup.string().required(),
  numberCaseFile: yup.string().required().matches(regexPatternNumberFileCase, {
    message: 'El formato del código no es válido. Debe seguir el patrón "####-####-####-####-LL-LL-##".',
  }),
  judgmentNumber: yup.number().required().min(1),
  secretary: yup.string().required().max(150),
  amountDemandedDollars: yup.number().required().min(1),
  amountDemandedSoles: yup.number().required().min(1),
  cautionaryCode: yup.string().required().matches(/^\d*$/),
  clientId: yup.number().required().min(1),
  customerUserId: yup.number().required().min(1),
  demandDate: yup.string().required(),
  judge: yup.string().required().max(150),
  judicialCourtId: yup.number().required().min(1),
  judicialProceduralWayId: yup.number().required().min(1),
  judicialSubjectId: yup.number().required().min(1),
  judicialVenue: yup.string().required().max(150),
  customerHasBankId: yup.number().required().min(1),
})

export const JudicialFileCaseResolver = yupResolver(JudicialFileCaseSchema)
