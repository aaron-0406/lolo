import { JudicialBinDefendantProceduralActionType } from '@/types/judicial/judicial-bin-defendant-procedural-action.type'
import { yupResolver } from '@hookform/resolvers/yup'
import yup from 'shared/yupLocale'

const JudicialBinDefendantProceduralActionModalSchema: yup.SchemaOf<
  Omit<JudicialBinDefendantProceduralActionType, 'createdAt' | 'updatedAt' | 'deletedAt' | 'id'>
> = yup.object().shape({
  defendantProceduralAction: yup
    .string()
    .min(1)
    .max(200)
    .required()
    .matches(/^[^\d]+$/),
  customerHasBankId: yup.number().required(),
})

export const ModalJudicialBinDefendantProceduralActionResolver = yupResolver(
  JudicialBinDefendantProceduralActionModalSchema
)
