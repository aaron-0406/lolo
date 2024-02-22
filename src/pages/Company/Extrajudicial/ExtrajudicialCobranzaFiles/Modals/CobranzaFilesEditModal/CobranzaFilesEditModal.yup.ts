import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { FileType } from '@/types/extrajudicial/file.type'

const ModalCobranzaFilesEdit: yup.SchemaOf<Omit<FileType, 'id' | 'name' | 'createdAt' | 'classificationTag'>> = yup
  .object()
  .shape({
    originalName: yup.string().required(),
    clientId: yup.number().required(),
    tagId: yup.number().required(),
  })

export const ModalCobranzaFilesEditResolver = yupResolver(ModalCobranzaFilesEdit)
