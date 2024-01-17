import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { FileType } from '@/types/extrajudicial/file.type'

const ModalCobranzaFiles: yup.SchemaOf<Omit<FileType, 'id' | 'name' | 'originalName' | 'createdAt'>> = yup
  .object()
  .shape({
    clientId: yup.number().required(),
  })

export const ModalCobranzaFilesResolver = yupResolver(ModalCobranzaFiles)
