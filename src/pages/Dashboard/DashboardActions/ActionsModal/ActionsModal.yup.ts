import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../shared/yupLocale'
import { ManagementActionType } from '../../../../shared/types/management-action.type'

const ModalActions: yup.SchemaOf<Omit<ManagementActionType, 'customerHasBankId' | 'id'>> = yup.object().shape({
  codeAction: yup.string().required().max(10),
  nameAction: yup.string().required().max(150),
  codeSubTypeManagement: yup.string().required().max(10),
})

export const ModalActionsResolver = yupResolver(ModalActions)
