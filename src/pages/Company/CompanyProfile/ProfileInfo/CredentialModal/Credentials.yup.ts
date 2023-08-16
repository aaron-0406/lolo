import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../shared/yupLocale'
import { CredentialFormType } from './hookform.type'

const CredentialsSchema: yup.SchemaOf<CredentialFormType> = yup.object().shape({
  newPassword: yup.string().required(),
  repeatPassword: yup.string().required(),
})

export const CredentialsResolver = yupResolver(CredentialsSchema)
