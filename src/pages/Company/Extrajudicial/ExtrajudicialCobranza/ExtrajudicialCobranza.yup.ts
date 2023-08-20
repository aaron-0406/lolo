import { yupResolver } from '@hookform/resolvers/yup'
import { ClientType } from '../../../../shared/types/extrajudicial/client.type'
import { CommentType } from '../../../../shared/types/extrajudicial/comment.type'
import yup from '../../../../shared/yupLocale'

const ExtrajudicialCobranzaSchema: yup.SchemaOf<Omit<ClientType, 'id' | 'createdAt'>> = yup.object().shape({
  code: yup.string().required().matches(/^\d*$/),
  negotiationId: yup.number().required().min(1),
  dniOrRuc: yup.string().optional().max(20),
  name: yup.string().required().min(5).max(200),
  salePerimeter: yup.string().optional(),
  phone: yup.string().optional(),
  email: yup.string().optional(),
  cityId: yup.number().required().min(1),
  funcionarioId: yup.number().required().min(1),
  customerUserId: yup.number().required().min(1),
  customerHasBankId: yup.number().required().min(1),
})

const ExtrajudicialCobranzaCommentSchema: yup.SchemaOf<Omit<CommentType, 'id'>> = yup.object().shape({
  clientId: yup.number().min(1).required(),
  customerUserId: yup.number().min(1).required(),
  comment: yup.string().required(),
  date: yup.string().required(),
  negotiation: yup.string().required(),
  managementActionId: yup.number().optional(),
})

export const ExtrajudicialCobranzaResolver = yupResolver(ExtrajudicialCobranzaSchema)
export const ExtrajudicialCobranzaCommentResolver = yupResolver(ExtrajudicialCobranzaCommentSchema)
