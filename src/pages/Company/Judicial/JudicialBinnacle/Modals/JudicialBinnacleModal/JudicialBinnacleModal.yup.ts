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
  })

export const ModalJudicialBinnacleResolver = yupResolver(ModalJudicialBinnacle)
