import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { CredentialsFormType } from './hookform.type'

const CredentialsSchema: yup.SchemaOf<CredentialsFormType> = yup.object().shape({
  name: yup.string().required(),
  lastname: yup.string().required(),
  dni: yup.string().required(),
  phone: yup.string().required(),
})

export const CredentialsSchemaResolver = yupResolver(CredentialsSchema)
