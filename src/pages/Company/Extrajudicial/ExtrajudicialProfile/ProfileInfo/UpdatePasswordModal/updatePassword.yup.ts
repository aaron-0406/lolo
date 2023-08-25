import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { PasswordFormType } from './hookform.type'

const PasswordSchema: yup.SchemaOf<PasswordFormType> = yup.object().shape({
  newPassword: yup.string().required(),
  repeatPassword: yup.string().required(),
})

export const PasswordSchemaResolver = yupResolver(PasswordSchema)
