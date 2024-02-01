import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { ExtTagType } from '@/types/extrajudicial/ext-tag.type'

const ModalCobranzaTags: yup.SchemaOf<Omit<ExtTagType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>> = yup
  .object()
  .shape({
    name: yup.string().max(200).required(),
    color: yup.string().max(7).required(),
    tagGroupId: yup.number().required(),
    customerHasBankId: yup.number().required(),
  })

export const ModalCobranzaTagsResolver = yupResolver(ModalCobranzaTags)
