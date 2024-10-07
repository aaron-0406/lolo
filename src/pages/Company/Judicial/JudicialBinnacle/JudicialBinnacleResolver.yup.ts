import { yupResolver } from '@hookform/resolvers/yup'
import yup from 'shared/yupLocale'
import { JudicialBinnacleType } from '@/types/judicial/judicial-binnacle.type'

const JudicialBinnacle: yup.SchemaOf<Omit<JudicialBinnacleType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>> =
  yup.object().shape({
    date: yup.string().required(),
    binnacleTypeId: yup.number().required(),
    customerHasBankId: yup.number().required(),
    lastPerformed: yup.string().required(),
    judicialBinProceduralStageId: yup.number().required(),
    judicialFileCaseId: yup.number().required(),
    createdBy: yup.string().optional(),
    fojas: yup.number().required(),
    notificationType: yup.string().required(),
    userDescription: yup.string().required(),
    totalTariff: yup.number().optional(),
    tariffHistory: yup.string().optional(),
    resolutionDate: yup.string().optional(),
    index: yup.number().optional(),
    acto: yup.string().optional(),
    folios: yup.number().optional(),
    entryDate: yup.string().optional(),
    provedioDate: yup.date().optional(),
  })

export const JudicialBinnacleResolver = yupResolver(JudicialBinnacle)
