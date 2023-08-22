import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { CommentType } from '../../../../../../shared/types/extrajudicial/comment.type'

const ModalCobranzaComments: yup.SchemaOf<Omit<CommentType, 'customerUserId'|'clientId'|'id'|'date' >> = yup.object().shape({
    comment: yup.string().required().max(400),
    negotiation: yup.string().required().max(100),
    managementActionId: yup.number().required().max(11),
})

export const ModalCobranzaCommentsResolver = yupResolver(ModalCobranzaComments)
