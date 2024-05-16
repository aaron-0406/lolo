import { yupResolver } from '@hookform/resolvers/yup'
import { JudicialCaseFileType } from '@/types/judicial/judicial-case-file.type'
import yup from '../../../../shared/yupLocale'
const regexPatternNumberFileCase = /^\d{5}-\d{4}-\d{1,4}-\d{4}-[A-Z]{2}-[A-Z]{2}-\d{2}$/

const JudicialFileCaseSchema: yup.SchemaOf<
  Omit<JudicialCaseFileType, 'id' | 'createdAt' | 'processComment' | 'processStatus' | 'processReasonId'>
> = yup.object().shape({
  numberCaseFile: yup.string().required().matches(regexPatternNumberFileCase, {
    message: 'Patrón "#####-####-####-####-LL-LL-##".',
  }),
  judgmentNumber: yup.number().optional(),
  secretary: yup.string().optional(),
  amountDemandedDollars: yup.number().optional(),
  amountDemandedSoles: yup.number().optional(),
  cautionaryCode: yup.string().optional().matches(/^\d*$/, { message: 'Debe ser un número entero' }),
  errandCode: yup.string().optional(),
  judicialVenue: yup.string().optional(),
  judge: yup.string().required().optional(),
  demandDate: yup.string().optional(),
  judicialCourtId: yup.number().required().min(1),
  judicialSubjectId: yup.number().required().min(1),
  judicialProceduralWayId: yup.number().required().min(1),
  clientId: yup.number().required().min(1),
  customerUserId: yup.number().required().min(1),
  customerHasBankId: yup.number().required().min(1),
})

export const JudicialFileCaseResolver = yupResolver(JudicialFileCaseSchema)
