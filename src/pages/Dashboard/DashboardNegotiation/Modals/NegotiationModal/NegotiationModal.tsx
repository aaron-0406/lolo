import { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Controller } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { ModalNegotiationResolver } from './NegotiationModal.yup'
import { NegotiationType } from '../../../../../shared/types/negotiation.type'
import Modal from '../../../../../ui/Modal'

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

const NegotiationModal = ({ visible, onClose , isEdit = false}: NegotiationModalProps) => {
  const formMethods = useForm<NegotiationType>({
    resolver: ModalNegotiationResolver,
    mode: 'all',
    defaultValues: defaultValuesCustomerUser,
  })

  const {
    setValue,
    getValues,
    control,
    reset,
    formState: { isValid },
  } = formMethods

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-files"
        title={isEdit ? 'Editar Cliente' : 'Agregar Cliente'}
        contentOverflowY="auto"
      ></Modal>
    </FormProvider>
  )
}

export default NegotiationModal
