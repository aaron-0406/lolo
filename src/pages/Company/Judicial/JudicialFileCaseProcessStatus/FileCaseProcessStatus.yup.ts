import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../shared/yupLocale'
import { JudicialCasefileProcessStatusType } from '@/types/judicial/judicial-case-file-process-status.type'

const JudicialFileCaseProcessStatusSchema: yup.SchemaOf<Omit<JudicialCasefileProcessStatusType, 'id'>> = yup
  .object()
  .shape({
    processComment: yup.string().optional(),
    processReasonId: yup.number().optional(),
    processStatus: yup.string().optional(),
  })

export const JudicialFileCaseResolver = yupResolver(JudicialFileCaseProcessStatusSchema)
