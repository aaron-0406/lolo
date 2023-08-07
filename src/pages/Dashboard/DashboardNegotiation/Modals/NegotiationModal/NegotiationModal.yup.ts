import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../shared/yupLocale'
import { NegotiationType } from '../../../../../shared/types/negotiation.type'

const NegotiationModal: yup.SchemaOf<Omit<NegotiationType, 'createdAt' | 'id'>> = yup.object().shape({
  name: yup.string().min(3).required(),
  customerHasBankId: yup.number().required(),
})

export const ModalNegotiationResolver = yupResolver(NegotiationModal)
