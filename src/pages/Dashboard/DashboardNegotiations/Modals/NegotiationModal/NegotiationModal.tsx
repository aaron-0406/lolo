import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { FormProvider, useForm } from 'react-hook-form'
import {
  createNegotiation,
  updateNegotiation,
  getAllNegociacionesById,
} from '../../../../../shared/services/negotiation.service'
import { ModalNegotiationResolver } from './NegotiationModal.yup'
import { NegotiationType } from '../../../../../shared/types/negotiation.type'
import Modal from '../../../../../ui/Modal'
import Container from '../../../../../ui/Container'
import Button from '../../../../../ui/Button'
import notification from '../../../../../ui/notification'
import NegotiationInfoForm from './NegotiationInfoForm'
import dashNegotiationCache from '../../NegotiationTable/utils/dash-negociaciones.cache'

type NegotiationModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idNegotiation?: number
  chb: number
}

const defaultValuesNegotiation: Omit<NegotiationType, 'createdAt'> = {
  id: 0,
  name: '',
  customerHasBankId: 0,
}

const NegotiationModal = ({ visible, onClose, isEdit = false, idNegotiation = 0, chb }: NegotiationModalProps) => {
  const queryClient = useQueryClient()
  const {
    actions: { createNegotiationCache, editNegotiationCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = dashNegotiationCache(queryClient)

  const formMethods = useForm<NegotiationType>({
    resolver: ModalNegotiationResolver,
    mode: 'all',
    defaultValues: defaultValuesNegotiation,
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateNegotiation, mutate: mutateCreateNegotiation } = useMutation<any, Error>(
    async () => {
      const { id, ...restNegotiation } = getValues()
      return await createNegotiation({ ...restNegotiation, customerHasBankId: chb })
    },
    {
      onSuccess: (result) => {
        createNegotiationCache(result.data)
        notification({ type: 'success', message: 'Negociación creada' })
        handleClickCloseModal()
      },
      onMutate: () => {
        onMutateCache(chb)
      },
      onSettled: () => {
        onSettledCache(chb)
      },
      onError: (error: any, _, context: any) => {
        onErrorCache(context, chb)
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
      return await updateNegotiation(id, { ...restNegotiation, customerHasBankId: chb })
    },
    {
      onSuccess: (result) => {
        editNegotiationCache(result.data)
        notification({ type: 'success', message: 'Negociación editada' })
        onClose()
      },
      onMutate: () => {
        onMutateCache(chb)
      },
      onSettled: () => {
        onSettledCache(chb)
      },
      onError: (error: any, _, context: any) => {
        onErrorCache(context, chb)
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { refetch: refetchNegotiations } = useQuery(
    'get-all-negociaciones-by-id',
    async () => {
      return getAllNegociacionesById(idNegotiation)
    },
    {
      onSuccess: ({ data }) => {
        if (idNegotiation !== 0) {
          setValue('name', data.name)
          setValue('customerHasBankId', data.customerHasBankId)
          setValue('id', data.id)
        } else {
          reset(defaultValuesNegotiation)
        }
      },
      enabled: false,
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

  useEffect(() => {
    if (!!idNegotiation) {
      refetchNegotiations()
    }
  }, [idNegotiation, refetchNegotiations])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-negociaciones"
        title={isEdit ? 'Editar Negociación' : 'Agregar Negociación'}
        contentOverflowY="auto"
        size="small"
        minHeight="140px"
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
      >
        <Container
          width="100%"
          height="140px"
          display="flex"
          justify-content="center"
          flexDirection="column"
          align-items="center"
          gap="20px"
        >
          <Container width="100%" display="flex" flexDirection="column" gap="20px" padding="20px" margin="30px 0">
            <NegotiationInfoForm />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default NegotiationModal