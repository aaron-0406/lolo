import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { ExtIpAddressBankType } from '@/types/extrajudicial/ext-ip-address-bank.type'

const IpAddressBankModal: yup.SchemaOf<
  Omit<ExtIpAddressBankType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
> = yup.object().shape({
  addressName: yup.string().min(3).required(),
  ip: yup.string().min(3).required(),
  state: yup.boolean().required(),
})

export const ModalIpAddressBankResolver = yupResolver(IpAddressBankModal)
