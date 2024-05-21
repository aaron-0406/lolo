import { useEffect } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { JudicialSedeType } from '@/types/judicial/judicial-sede.type'
import { ModalSedeResolver } from './SedeModal.yup'
import { createSede, getSedeByID, editSede } from '@/services/judicial/judicial-sede.service'
import notification from '@/ui/notification'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import SedeInfoForm from './SedeInfoForm'
import judicialSedeCache, { KEY_JUDICIAL_SEDE_CACHE } from '../../SedeTable/utils/judicial-sede.cache'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'

type SedeModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idSede?: number
}

const SedeModal = ({ visible, onClose, isEdit = false, idSede = 0 }: SedeModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const chbNumber = parseInt(chb.length ? chb : '0')

  const queryClient = useQueryClient()

  const {
    actions: { createSedeCache, editSedeCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialSedeCache(queryClient)

  const formMethods = useForm<Omit<JudicialSedeType, 'createdAt' | 'updatedAt' | 'deletedAt'>>({
    resolver: ModalSedeResolver,
    mode: 'all',
    defaultValues: {
      id: 0,
      sede: '',
      customerHasBankId: chbNumber,
    },
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateSede, mutate: createSedeMutate } = useMutation<
    AxiosResponse<JudicialSedeType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restClient } = getValues()
      return await createSede({ ...restClient, customerHasBankId: chbNumber })
    },
    {
      onSuccess: (result) => {
        createSedeCache(result.data)
        notification({ type: 'success', message: 'Sede judicial creada' })
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

  const { isLoading: loadingEditSede, mutate: editSedeMutate } = useMutation<
    AxiosResponse<JudicialSedeType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restClient } = getValues()
      return await editSede({ ...restClient, customerHasBankId: chbNumber }, id)
    },
    {
      onSuccess: (result) => {
        editSedeCache(result.data)
        notification({ type: 'success', message: 'Sede judicial editada' })
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

  const { refetch: refetchGetSedeById } = useQuery<AxiosResponse<JudicialSedeType>>(
    [`${KEY_JUDICIAL_SEDE_CACHE}-GET-SEDE-BY-ID`, parseInt(chb.length ? chb : '0')],
    async () => {
      return getSedeByID(idSede)
    },
    {
      onSuccess: ({ data }) => {
        if (!!idSede) {
          setValue('id', data.id, { shouldValidate: true })
          setValue('sede', data.sede, { shouldValidate: true })
          setValue('customerHasBankId', data.customerHasBankId, { shouldValidate: true })
        } else {
          reset()
        }
      },
      enabled: false,
    }
  )

  const onAddSede = () => {
    createSedeMutate()
  }

  const onEditSede = () => {
    editSedeMutate()
  }

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  useEffect(() => {
    if (!!idSede) {
      refetchGetSedeById()
    }
  }, [idSede, refetchGetSedeById])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-sede"
        title={isEdit ? 'Editar sede judicial' : 'Agregar sede judicial'}
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
              onClick={isEdit ? onEditSede : onAddSede}
              loading={loadingCreateSede || loadingEditSede}
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
            <SedeInfoForm />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default SedeModal
