import { useEffect } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { JudicialObsTypeType } from '@/types/judicial/judicial-obs-type.type'
import { ModalObsTypeResolver } from './ObsTypeModal.yup'
import { createObsType, getObsTypeByID, editObsType } from '@/services/judicial/judicial-obs-type.service'
import notification from '@/ui/notification'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import ObsTypeInfoForm from './ObsTypeInfoForm'
import judicialObsTypeCache, { KEY_JUDICIAL_OBS_TYPE_CACHE } from '../../ObsTypeTable/utils/judicial-obs-type.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'

type ObsTypeModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idObsType?: number
}

const ObsTypeModal = ({ visible, onClose, isEdit = false, idObsType = 0 }: ObsTypeModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const chbNumber = parseInt(chb.length ? chb : '0')

  const queryClient = useQueryClient()

  const {
    actions: { createObsTypeCache, editObsTypeCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialObsTypeCache(queryClient)

  const formMethods = useForm<Omit<JudicialObsTypeType, 'createdAt' | 'updatedAt' | 'deletedAt'>>({
    resolver: ModalObsTypeResolver,
    mode: 'all',
    defaultValues: {
      id: 0,
      type: '',
      customerHasBankId: chbNumber,
    },
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateObsType, mutate: createObsTypeMutate } = useMutation<
    AxiosResponse<JudicialObsTypeType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restClient } = getValues()
      return await createObsType({ ...restClient, customerHasBankId: chbNumber })
    },
    {
      onSuccess: (result) => {
        createObsTypeCache(result.data)
        notification({ type: 'success', message: 'Tipo de observación creado' })
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateCache(chbNumber)
      },
      onSettled: () => {
        onSettledCache(chbNumber)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, chbNumber)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { isLoading: loadingEditObsType, mutate: editObsTypeMutate } = useMutation<
    AxiosResponse<JudicialObsTypeType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restClient } = getValues()
      return await editObsType({ ...restClient, customerHasBankId: chbNumber }, id)
    },
    {
      onSuccess: (result) => {
        editObsTypeCache(result.data)
        notification({ type: 'success', message: 'Tipo de observación creado' })
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateCache(chbNumber)
      },
      onSettled: () => {
        onSettledCache(chbNumber)
      },
      onError: (error: any, _, context: any) => {
        onErrorCache(context, chbNumber)
        notification({
          type: 'error',
          message: error.response.data.message,
        })
      },
    }
  )

  const { refetch: refetchGetObsTypeById } = useQuery<AxiosResponse<JudicialObsTypeType>>(
    [`${KEY_JUDICIAL_OBS_TYPE_CACHE}-GET-OBS-TYPE-BY-ID`, parseInt(chb.length ? chb : '0')],
    async () => {
      return getObsTypeByID(idObsType)
    },
    {
      onSuccess: ({ data }) => {
        if (!!idObsType) {
          setValue('id', data.id, { shouldValidate: true })
          setValue('type', data.type, { shouldValidate: true })
          setValue('customerHasBankId', data.customerHasBankId, { shouldValidate: true })
        } else {
          reset()
        }
      },
      enabled: false,
    }
  )

  const onAddObsType = () => {
    createObsTypeMutate()
  }

  const onEditObsType = () => {
    editObsTypeMutate()
  }

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  useEffect(() => {
    if (!!idObsType) {
      refetchGetObsTypeById()
    }
  }, [idObsType, refetchGetObsTypeById])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-obs-type"
        title={isEdit ? 'Editar tipo de observación' : 'Agregar tipo de observación'}
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
              onClick={isEdit ? onEditObsType : onAddObsType}
              loading={loadingCreateObsType || loadingEditObsType}
              disabled={!isValid}
            />
          </Container>
        }
      >
        <Container
          width="100%"
          height="210px"
          display="flex"
          justify-content="center"
          flexDirection="column"
          align-items="center"
          gap="20px"
        >
          <Container width="100%" display="flex" flexDirection="column" gap="10px" padding="20px">
            <ObsTypeInfoForm />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default ObsTypeModal
