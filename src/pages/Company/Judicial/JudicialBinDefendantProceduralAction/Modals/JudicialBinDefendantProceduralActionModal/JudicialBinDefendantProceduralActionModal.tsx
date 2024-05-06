import { useLoloContext } from '@/contexts/LoloProvider'
import { JudicialBinDefendantProceduralActionType } from '@/types/judicial/judicial-bin-defendant-procedural-action.type'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import extBinDefendantProceduralActionsCache from '../../JudicialBinDefendantProceduralActionTable/utils/judicial-bin-defendant-procedural-action.cache'
import { FormProvider, useForm } from 'react-hook-form'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { AxiosError } from 'axios'
import notification from '@/ui/notification'
import {
  createJudicialBinDefendantProceduralAction,
  getJudicialBinDefendantProceduralActionById,
  updateJudicialBinDefendantProceduralAction,
} from '@/services/judicial/judicial-bin-defendant-procedural-action.service'
import { useEffect } from 'react'
import Modal from '@/ui/Modal'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import JudicialBinDefendantProceduralActionInfoForm from './JudicialBinDefendantProceduralActionInfoForm'
import { ModalJudicialBinDefendantProceduralActionResolver } from './JudicialBinDefendantProceduralActionModal.yup'

type JudicialBinDefendantProceduralActionModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idBinDefendantProceduralAction?: number
}

const defaultValuesBinDefendantProceduralAction: Omit<
  JudicialBinDefendantProceduralActionType,
  'createdAt' | 'updatedAt' | 'deletedAt'
> = {
  id: 0,
  defendantProceduralAction: '',
  customerHasBankId: 0,
}

const JudicialBinDefendantProceduralActionModal = ({
  onClose,
  visible,
  idBinDefendantProceduralAction,
  isEdit,
}: JudicialBinDefendantProceduralActionModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()
  const queryClient = useQueryClient()

  const {
    actions: { createBinDefendantProceduralActionCache, editBinDefendantProceduralActionCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = extBinDefendantProceduralActionsCache(queryClient)

  const formMethods = useForm<JudicialBinDefendantProceduralActionType>({
    resolver: ModalJudicialBinDefendantProceduralActionResolver,
    mode: 'all',
    defaultValues: defaultValuesBinDefendantProceduralAction,
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateDefendantProceduralAction, mutate: mutateCreateDefendantProceduralAction } =
    useMutation<any, AxiosError<CustomErrorResponse>>(
      async () => {
        const { id, ...restBinDefendantProceduralAction } = getValues()
        return await createJudicialBinDefendantProceduralAction({
          ...restBinDefendantProceduralAction,
          customerHasBankId: parseInt(chb),
        })
      },
      {
        onSuccess: (result) => {
          createBinDefendantProceduralActionCache(result.data)
          notification({ type: 'success', message: 'Etapa Procedimental creada' })
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

  const { isLoading: loadingEditDefendantProceduralAction, mutate: mutateEditDefendantProceduralAction } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, customerHasBankId, ...restBinDefendantProceduralAction } = getValues()
      return await updateJudicialBinDefendantProceduralAction(id, { ...restBinDefendantProceduralAction })
    },
    {
      onSuccess: (result) => {
        editBinDefendantProceduralActionCache(result.data)
        notification({ type: 'success', message: 'Etapa Procedimental editada' })
        onClose()
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

  const { refetch: refetchDefendantProceduralActions } = useQuery(
    'get-all-bin-procedutal-stage-by-id',
    async () => {
      return getJudicialBinDefendantProceduralActionById(Number(idBinDefendantProceduralAction))
    },
    {
      onSuccess: ({ data }) => {
        if (idBinDefendantProceduralAction !== 0) {
          setValue('defendantProceduralAction', data.defendantProceduralAction)
          setValue('customerHasBankId', data.customerHasBankId)
          setValue('id', data.id)
        } else {
          reset(defaultValuesBinDefendantProceduralAction)
        }
      },
      enabled: false,
    }
  )

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  const onAddDefendantProceduralAction = () => {
    mutateCreateDefendantProceduralAction()
  }

  const onEditDefendantProceduralAction = () => {
    mutateEditDefendantProceduralAction()
  }

  useEffect(() => {
    if (!!idBinDefendantProceduralAction) {
      refetchDefendantProceduralActions()
    }
  }, [idBinDefendantProceduralAction, refetchDefendantProceduralActions])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-negociaciones"
        title={isEdit ? 'Editar Actuación procesal demandada' : 'Agregar Actuación procesal demandada'}
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
              onClick={isEdit ? onEditDefendantProceduralAction : onAddDefendantProceduralAction}
              loading={loadingCreateDefendantProceduralAction || loadingEditDefendantProceduralAction}
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
          <Container width="100%" display="flex" flexDirection="column" padding="20px">
            <JudicialBinDefendantProceduralActionInfoForm />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default JudicialBinDefendantProceduralActionModal
