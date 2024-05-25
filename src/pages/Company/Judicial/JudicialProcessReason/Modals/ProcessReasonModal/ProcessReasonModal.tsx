import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { createProcessReason, editProcessReason } from '@/services/judicial/judicial-process-reason.service'
import { ModalProcessReasonResolver } from './ProcessReasonModal.yup'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import notification from '@/ui/notification'
import ProcessReasonInfoForm from './ProcessReasonInfoForm'
import { AxiosError, AxiosResponse } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'
import judicialProcessReasonCache from '../../ProcessReasonTable/utils/judicial-process-reason.cache'
import { JudicialProcessReasonType } from '@/types/judicial/judicial-process-reason.types'
import { getProcessReasonByID } from '../../../../../../shared/services/judicial/judicial-process-reason.service'

type ProcessReasonModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idProcessReason?: number
}

const defaultValuesProcessReason: Omit<JudicialProcessReasonType, 'createdAt' | 'updatedAt' | 'deletedAt'> = {
  id: 0,
  reason: '',
  customerHasBankId: 0,
}

const ProcessReasonModal = ({ visible, onClose, isEdit = false, idProcessReason = 0 }: ProcessReasonModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const queryClient = useQueryClient()

  const {
    actions: { createProcessReasonCache, editProcessReasonCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialProcessReasonCache(queryClient)

  const formMethods = useForm<JudicialProcessReasonType>({
    resolver: ModalProcessReasonResolver,
    mode: 'all',
    defaultValues: defaultValuesProcessReason,
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateProcessReason, mutate: mutateCreateProcessReason } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restProcess } = getValues()
      return await createProcessReason({ ...restProcess, customerHasBankId: parseInt(chb) })
    },
    {
      onSuccess: (result) => {
        createProcessReasonCache(result.data)
        notification({ type: 'success', message: 'Motivo del proceso creado' })
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateCache(parseInt(chb))
      },
      onSettled: () => {
        onSettledCache(parseInt(chb))
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, parseInt(chb))
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { isLoading: loadingEditProcessReason, mutate: mutateEditProcessReason } = useMutation<
    AxiosResponse<JudicialProcessReasonType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restProcessReason } = getValues()
      return await editProcessReason(id, {
        reason: restProcessReason.reason,
      })
    },
    {
      onSuccess: (result) => {
        editProcessReasonCache(result.data)
        notification({ type: 'success', message: 'Motivo del proceso editado' })
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateCache(parseInt(chb))
      },
      onSettled: () => {
        onSettledCache(parseInt(chb))
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, parseInt(chb))
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { refetch: refetchProcessReason } = useQuery(
    'get-process-reason-by-id',
    async () => {
      return getProcessReasonByID(idProcessReason)
    },
    {
      onSuccess: ({ data }) => {
        if (idProcessReason !== 0) {
          setValue('reason', data.reason)
          setValue('customerHasBankId', data.customerHasBankId)
          setValue('id', data.id)
        } else {
          reset(defaultValuesProcessReason)
        }
      },
      enabled: false,
    }
  )

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  const onAddProcessReason = () => {
    mutateCreateProcessReason()
  }

  const onEditProcessReason = () => {
    mutateEditProcessReason()
  }

  useEffect(() => {
    if (!!idProcessReason) {
      refetchProcessReason()
    }
  }, [idProcessReason, refetchProcessReason])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-process-reason"
        title={isEdit ? 'Editar Motivo del proceso' : 'Agregar Motivo del proceso'}
        contentOverflowY="auto"
        size="small"
        minHeight="140px"
        footer={
          <Container width="100%" height="75px" display="flex" justifyContent="end" alignItems="center" gap="20px">
            <Button
              width="125px"
              label={isEdit ? 'Editar' : 'Agregar'}
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={isEdit ? onEditProcessReason : onAddProcessReason}
              loading={loadingCreateProcessReason || loadingEditProcessReason}
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
            <ProcessReasonInfoForm />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default ProcessReasonModal
