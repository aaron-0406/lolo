import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { CommentType } from '../../../../../../shared/types/extrajudicial/comment.type'

const ModalCobranzaComments: yup.SchemaOf<Omit<CommentType, 'id' | 'hour'>> = yup.object().shape({
  clientId: yup.number().required(),
  customerUserId: yup.number().required(),
  comment: yup.string().required(),
  date: yup.string().required(),
  negotiation: yup.string().required(),
  managementActionId: yup.number().optional(),
})

export const ModalCobranzaCommentsResolver = yupResolver(ModalCobranzaComments)
