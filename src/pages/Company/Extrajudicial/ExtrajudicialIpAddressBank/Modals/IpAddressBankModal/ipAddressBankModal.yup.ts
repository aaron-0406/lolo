import { yupResolver } from '@hookform/resolvers/yup'
import yup from '../../../../../../shared/yupLocale'
import { ExtIpAddressBankType } from '@/types/extrajudicial/ext-ip-address-bank.type'

const IpAddressBankModal: yup.SchemaOf<Omit<ExtIpAddressBankType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>> = yup
  .object()
  .shape({
    addressName: yup.string().min(2).max(200).required(),
    ip: yup.string().min(2).max(100).required(),
    state: yup.boolean().required(),
    customerId: yup.number().required(),
  })

export const ModalIpAddressBankResolver = yupResolver(IpAddressBankModal)
