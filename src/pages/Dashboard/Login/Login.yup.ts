import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../shared/yupLocale'
import { LoginTypeDash } from '../../../shared/types/dash/auth-dash.type'

const LoginSchema: yup.SchemaOf<LoginTypeDash> = yup.object().shape({
  email: yup.string().email('No tiene un formato válido').required('Este campo es requerido'),
  password: yup.string().required('Este campo es requerido'),
})

export const LoginResolver = yupResolver(LoginSchema)
