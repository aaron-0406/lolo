import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { PasswordFormType } from './hookform.type'

const PasswordSchema: yup.SchemaOf<PasswordFormType> = yup.object().shape({
  newPassword: yup
    .string()
    .min(12, 'debe contener un mínimo de doce caracteres')
    .max(70)
    .matches(/^(?=.*[0-9])/, 'Debe contener al menos un número')
    .matches(/^(?=.*[\W_])/, 'Debe contener al menos un carácter especial')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])/, 'Se necesita mínimo una letra minúscula o mayúscula')
    .required(),
  repeatPassword: yup
    .string()
    .min(12, 'debe contener un mínimo de doce caracteres')
    .max(70)
    .matches(/^(?=.*[0-9])/, 'Debe contener al menos un número')
    .matches(/^(?=.*[\W_])/, 'Debe contener al menos un carácter especial')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])/, 'Se necesita mínimo una letra minúscula o mayúscula')
    .required(),
})

export const PasswordSchemaResolver = yupResolver(PasswordSchema)
