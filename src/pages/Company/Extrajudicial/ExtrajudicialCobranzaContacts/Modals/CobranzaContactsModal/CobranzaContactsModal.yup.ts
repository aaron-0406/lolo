import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { ExtContactType } from '@/types/extrajudicial/ext-contact.type'

const peruPhoneNumberRegex = /^(9\d{8}|[1-7]\d{6})$/

const ModalCobranzaContacts: yup.SchemaOf<Omit<ExtContactType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>> = yup
  .object()
  .shape(
    {
      name: yup.string().max(200).required(),
      phone: yup
        .string()
        .max(9)
        .when('phone', {
          is: (value: string) => !!value,
          then: yup.string().matches(peruPhoneNumberRegex, 'El número de teléfono no es válido'),
          otherwise: yup.string().optional(),
        }),
      dni: yup.string().max(8),
      email: yup.string().max(200).email('La dirección de correo electrónico no es válida'),
      state: yup.boolean().required(),
      clientId: yup.number().required(),
      customerHasBankId: yup.number().required(),
      extContactTypeId: yup.number(),
    },
    [['phone', 'phone']]
  )
  .test({
    test: (value) => !!value.phone || !!value.email,
    message: 'Debes completar al menos un campo (teléfono o correo electrónico)',
  })

export const ModalCobranzaContactsResolver = yupResolver(ModalCobranzaContacts)
