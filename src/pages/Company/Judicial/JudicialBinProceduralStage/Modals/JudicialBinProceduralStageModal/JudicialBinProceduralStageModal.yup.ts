import { JudicialBinProceduralStageType } from '@/types/judicial/judicial-bin-procedural-stage.type'
import { yupResolver } from '@hookform/resolvers/yup'
import yup from 'shared/yupLocale'

const JudicialBinProceduralStageModalSchema: yup.SchemaOf<
  Omit<JudicialBinProceduralStageType, 'createdAt' | 'updatedAt' | 'deletedAt' | 'id'>
> = yup.object().shape({
  proceduralStage: yup
    .string()
    .min(1)
    .max(200)
    .required()
    .matches(/^[^\d]+$/),
  customerHasBankId: yup.number().required(),
})

export const ModalJudicialBinProceduralStageResolver = yupResolver(JudicialBinProceduralStageModalSchema)
