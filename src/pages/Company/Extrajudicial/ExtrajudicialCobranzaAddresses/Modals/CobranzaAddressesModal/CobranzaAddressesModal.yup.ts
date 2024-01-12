import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { DirectionType } from '@/types/extrajudicial/direction.type'

const ModalCobranzaAddresses: yup.SchemaOf<Omit<DirectionType, 'id' | 'createdAt'>> = yup.object().shape({
  direction: yup.string().required().max(200),
  type: yup.string().required().max(200),
  clientId: yup.number().required(),
})

export const ModalCobranzaAddressesResolver = yupResolver(ModalCobranzaAddresses)
