import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { JudicialBinnacleType } from '@/types/judicial/judicial-binnacle.type'

const ModalJudicialBinnacle: yup.SchemaOf<Omit<JudicialBinnacleType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>> =
  yup.object().shape({
    date: yup.string().required(),
    binnacleTypeId: yup.number().required(),
    customerHasBankId: yup.number().required(),
    lastPerformed: yup.string().required(),
    judicialBinProceduralStageId: yup.number().required(),
    judicialFileCaseId: yup.number().required(),
    createdBy: yup.number().required(),
    fojas: yup.number().required(),
    notificationType: yup.string().required(),
    userDescription: yup.string().required(),
    totalTariff: yup.number().optional(),
    tariffHistory: yup.string().optional(),
  })

export const ModalJudicialBinnacleResolver = yupResolver(ModalJudicialBinnacle)
