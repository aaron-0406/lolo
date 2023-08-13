import { useMutation, useQuery, useQueryClient } from 'react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { createNegotiation, updateNegotiation } from '../../../../../shared/services/negotiation.service'
import { ModalNegotiationResolver } from './NegotiationModal.yup'
import { NegotiationType } from '../../../../../shared/types/negotiation.type'
import Modal from '../../../../../ui/Modal'
import Container from '../../../../../ui/Container'
import Button from '../../../../../ui/Button'
import NegotiationInfoForm from './NegotiationInfoForm'
import notification from '../../../../../ui/notification'
import dashNegotiationCache from '../../../DashboardNegotiation/NegotiationTable/utils/dash-cobranza.cache'

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

const NegotiationModal = ({ visible, onClose, isEdit = false }: NegotiationModalProps) => {
  const formMethods = useForm<NegotiationType>({
    resolver: ModalNegotiationResolver,
    mode: 'all',
    defaultValues: defaultValuesCustomerUser,
  })

  const {
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const queryClient = useQueryClient()
  const {
    actions: { createNegotiationCache, editNegotiationCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = dashNegotiationCache(queryClient)

  const { isLoading: loadingCreateNegotiation, mutate: mutateCreateNegotiation } = useMutation<any, Error>(
    async () => {
      const { id, ...restNegotiation } = getValues()
      return await createNegotiation(restNegotiation)
    },
    {
      onSuccess: (result) => {
        createNegotiationCache(result.data)
        notification({ type: 'success', message: 'Negociación creada' })
        handleClickCloseModal()
      },
      onMutate: () => {
        onMutateCache()
      },
      onSettled: () => {
        onSettledCache()
      },
      onError: (error: any, _, context: any) => {
        onErrorCache(context)
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { isLoading: loadingEditNegotiation, mutate: mutateEditNegotiation } = useMutation<any, Error>(
    async () => {
      const { id, ...restNegotiation } = getValues()
      return await updateNegotiation(id, restNegotiation)
    },
    {
      onSuccess: () => {
        notification({ type: 'success', message: 'Cliente editado' })
        onClose()
      },
      onError: (error: any) => {
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  const onAddNegotiation = () => {
    mutateCreateNegotiation()
  }

  const onEditNegotiation = () => {
    mutateEditNegotiation()
  }

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-files"
        title={isEdit ? 'Editar Negociación' : 'Agregar Negociación'}
        contentOverflowY="auto"
        children={<NegotiationInfoForm />}
        footer={
          <Container width="100%" height="75px" display="flex" justifyContent="center" alignItems="center" gap="20px">
            <Button
              width="125px"
              label={isEdit ? 'Editar' : 'Agregar'}
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={isEdit ? onEditNegotiation : onAddNegotiation}
              loading={loadingCreateNegotiation || loadingEditNegotiation}
              disabled={!isValid}
            />
          </Container>
        }
      ></Modal>
    </FormProvider>
  )
}

export default NegotiationModal
