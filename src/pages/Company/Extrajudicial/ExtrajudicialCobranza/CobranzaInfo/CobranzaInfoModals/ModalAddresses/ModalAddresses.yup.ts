import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../../shared/yupLocale'
import { DirectionFormType } from './hookforms.interfaces'

const ModalAddressesSchema: yup.SchemaOf<Omit<DirectionFormType, 'id' | 'createdAt' | 'directions'>> = yup
  .object()
  .shape({
    direction: yup.string().required().min(5).max(150),
    type: yup.string().required().max(150),
    clientId: yup.number().required().min(1),
  })

export const ModalAddressesResolver = yupResolver(ModalAddressesSchema)
