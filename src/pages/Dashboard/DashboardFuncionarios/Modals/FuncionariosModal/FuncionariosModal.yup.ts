import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../shared/yupLocale'
import { FuncionarioType } from '../../../../../shared/types/funcionario.type'

const ModalFuncionarios: yup.SchemaOf<Omit<FuncionarioType, 'id'>> = yup.object().shape({
  name: yup.string().required().max(50),
  createdAt: yup.date().required().max(10),
  bankId: yup.number().required().max(10),
})

export const ModalFuncionariosResolver = yupResolver(ModalFuncionarios)
