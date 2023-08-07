import { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Controller } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { ModalNegotiationResolver } from './NegotiationModal.yup'
import { NegotiationType } from '../../../../../shared/types/negotiation.type'

type NegotiationModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
}

const defaultValuesCustomerUser: Omit<NegotiationType, 'createdAt'> = {
    id: 0,
    name: '',
    customerHasBankId: 0,
  }

const NegotiationModal = ({visible, onClose}: NegotiationModalProps) => {
    const formMethods = useForm<NegotiationType>({
        resolver: ModalNegotiationResolver,
        mode: 'all',
        defaultValues: defaultValuesCustomerUser,
      })
   
    return (<></>)
}

export default NegotiationModal
