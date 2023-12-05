import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { ExtContactType } from '@/types/extrajudicial/ext-contact.type'

const peruPhoneNumberRegex = /^(9\d{8}|[1-7]\d{6})$/

const ModalCobranzaContacts: yup.SchemaOf<Omit<ExtContactType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>> = yup
  .object()
  .shape({
    name: yup.string().max(200).required(),
    phone: yup.string().max(9).matches(peruPhoneNumberRegex, 'El número de teléfono no es válido').required(),
    email: yup.string().max(200).email('La dirección de correo electrónico no es válida').required(),
    state: yup.number().required(),
    clientId: yup.number().required(),
    customerHasBankId: yup.number().required(),
  })

export const ModalCobranzaContactsResolver = yupResolver(ModalCobranzaContacts)
