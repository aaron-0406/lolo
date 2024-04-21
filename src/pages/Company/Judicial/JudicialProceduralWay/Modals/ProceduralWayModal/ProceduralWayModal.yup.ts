import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { JudicialProceduralWayType } from '@/types/judicial/judicial-procedural-way.type'

const ProceduralWayModal: yup.SchemaOf<Omit<JudicialProceduralWayType, 'createdAt' | 'id'>> = yup.object().shape({
  proceduralWay: yup
    .string()
    .min(1)
    .max(200)
    .required()
    .matches(/^[^\d]+$/),
  customerHasBankId: yup.number().required(),
})

export const ModalProceduralWayResolver = yupResolver(ProceduralWayModal)
