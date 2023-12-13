import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { FuncionarioType } from '@/types/extrajudicial/funcionario.type'

const ModalFuncionarios: yup.SchemaOf<Omit<FuncionarioType, 'id' | 'createdAt'>> = yup.object().shape({
  name: yup
    .string()
    .required()
    .max(150)
    .matches(/^[^\d]+$/),
  customerHasBankId: yup.number().required(),
})

export const ModalFuncionariosResolver = yupResolver(ModalFuncionarios)
