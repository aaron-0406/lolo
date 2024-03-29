import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { ManagementActionType } from '@/types/extrajudicial/management-action.type'
import { ModalActionsResolver } from './ActionsModal.yup'
import {
  createManagementAction,
  getManagementActionById,
  updateManagementAction,
} from '@/services/extrajudicial/management-action.service'
import notification from '@/ui/notification'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import ActionInfoForm from './ActionInfoForm/ActionInfoForm'
import extAccionesCache from '../../ActionsTable/utils/ext-acciones.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'

type ActionsModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idAction?: number
}

const defaultValuesActions: Omit<ManagementActionType, 'customerHasBankId'> = {
  id: 0,
  codeAction: '',
  nameAction: '',
  codeSubTypeManagement: '',
}

const ActionsModal = ({ visible, onClose, isEdit = false, idAction = 0 }: ActionsModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const queryClient = useQueryClient()

  const {
    actions: { createActionCache, editActionCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = extAccionesCache(queryClient)

  const formMethods = useForm<ManagementActionType>({
    resolver: ModalActionsResolver,
    mode: 'all',
    defaultValues: defaultValuesActions,
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateAction, mutate: createAction } = useMutation<
    AxiosResponse<ManagementActionType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restClient } = getValues()
      return await createManagementAction({ ...restClient, customerHasBankId: parseInt(chb) })
    },
    {
      onSuccess: (result) => {
        createActionCache(result.data)
        notification({ type: 'success', message: 'Acción creada' })
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

  const { isLoading: loadingEditAction, mutate: editAction } = useMutation<
    AxiosResponse<ManagementActionType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restClient } = getValues()
      return await updateManagementAction(id, { ...restClient, customerHasBankId: parseInt(chb) })
    },
    {
      onSuccess: (result) => {
        editActionCache(result.data)
        notification({ type: 'success', message: 'Acción editada' })
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

  const { refetch: refetchGetActionById } = useQuery(
    'get-action-by-id',
    async () => {
      return getManagementActionById(idAction)
    },
    {
      onSuccess: ({ data }) => {
        if (!!idAction) {
          setValue('id', data.id)
          setValue('codeAction', data.codeAction)
          setValue('nameAction', data.nameAction)
          setValue('codeSubTypeManagement', data.codeSubTypeManagement)
        } else {
          reset(defaultValuesActions)
        }
      },
      enabled: false,
    }
  )

  const onAddAction = () => {
    createAction()
  }

  const onEditAction = () => {
    editAction()
  }

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  useEffect(() => {
    if (!!idAction) {
      refetchGetActionById()
    }
  }, [idAction, refetchGetActionById])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-files"
        title={isEdit ? 'Editar Accion' : 'Agregar Accion'}
        contentOverflowY="auto"
        size="small"
        minHeight="400px"
        footer={
          <Container width="100%" height="75px" display="flex" justifyContent="end" alignItems="center" gap="20px">
            <Button
              width="125px"
              label={isEdit ? 'Editar' : 'Agregar'}
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={isEdit ? onEditAction : onAddAction}
              loading={loadingCreateAction || loadingEditAction}
              disabled={!isValid}
            />
          </Container>
        }
      >
        <Container
          width="100%"
          height="260px"
          display="flex"
          justify-content="center"
          flexDirection="column"
          align-items="center"
          gap="20px"
        >
          <Container width="100%" display="flex" flexDirection="column" gap="20px" padding="20px" margin="30px 0">
            <ActionInfoForm />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default ActionsModal
