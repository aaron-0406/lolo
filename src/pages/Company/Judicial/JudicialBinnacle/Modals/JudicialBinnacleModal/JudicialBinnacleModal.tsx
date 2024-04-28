import { useMutation, useQuery, useQueryClient } from 'react-query'
import judicialBinnacleCache from '../../JudicialBinnacleTable/utils/judicial-binnacle.cache'
import { FormProvider, useForm } from 'react-hook-form'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import JudicialBinnacleInfoForm from './JudicialBinnacleInfoForm'
import { ModalJudicialBinnacleResolver } from './JudicialBinnacleModal.yup'
import moment from 'moment'
import { JudicialBinnacleType } from '@/types/judicial/judicial-binnacle.type'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useEffect } from 'react'
import notification from '@/ui/notification'
import { AxiosError, AxiosResponse } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { createBinnacle, getBinnacleById, updateBinnacle } from '@/services/judicial/judicial-binnacle.service'

type JudicialBinnacleModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idBinnacle?: number
  judicialFileCaseId?: number
}

const JudicialBinnacleModal = ({
  visible,
  onClose,
  isEdit = false,
  idBinnacle = 0,
  judicialFileCaseId = 0,
}: JudicialBinnacleModalProps) => {
  const queryClient = useQueryClient()
  const {
    actions: { createJudicialBinnacleCache, editJudicialBinnacleCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialBinnacleCache(queryClient)

  const {
    bank: {
      selectedBank: { idCHB },
    },
  } = useLoloContext()

  const formMethods = useForm<Omit<JudicialBinnacleType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>({
    resolver: ModalJudicialBinnacleResolver,
    mode: 'all',
    defaultValues: {
      date: moment(new Date()).format('DD-MM-YYYY'),
      binnacleTypeId: 0,
      customerHasBankId: Number(idCHB),
      judicialBinProceduralStageId: 0,
      judicialFileCaseId: Number(judicialFileCaseId),
      lastPerformed: '',
    },
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateJudicialBinnacle, mutate: createJudicialBinnacle } = useMutation<
    AxiosResponse<JudicialBinnacleType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { ...restClient } = getValues()
      return await createBinnacle({ ...restClient })
    },
    {
      onSuccess: (result) => {
        createJudicialBinnacleCache(result.data)
        notification({ type: 'success', message: 'Bitacora creado' })
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateCache(judicialFileCaseId)
      },
      onSettled: () => {
        onSettledCache(judicialFileCaseId)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, judicialFileCaseId)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { isLoading: loadingEditJudicialBinnacle, mutate: editJudicialBinnacle } = useMutation<
    AxiosResponse<JudicialBinnacleType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { customerHasBankId, judicialFileCaseId, ...restClient } = getValues()
      return await updateBinnacle(idBinnacle, { ...restClient })
    },
    {
      onSuccess: (result) => {
        editJudicialBinnacleCache(result.data)
        notification({ type: 'success', message: 'Bitacora editado' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(judicialFileCaseId)
      },
      onSettled: () => {
        onSettledCache(judicialFileCaseId)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, judicialFileCaseId)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { refetch: refetchGetJudicialBinnacleById } = useQuery(
    [`GET_BINNACLE_BY_ID`],
    async () => {
      return getBinnacleById(idBinnacle)
    },
    {
      onSuccess: ({ data }) => {
        if (!!idBinnacle) {
          setValue('binnacleTypeId', data.binnacleTypeId, { shouldValidate: true })
          setValue('judicialBinProceduralStageId', data.judicialBinProceduralStageId, { shouldValidate: true })
          setValue('customerHasBankId', data?.customerHasBankId, { shouldValidate: true })
          setValue('date', moment(data.date).format('DD-MM-YYYY'), { shouldValidate: true })
          setValue('lastPerformed', data.lastPerformed, { shouldValidate: true })
          setValue('judicialFileCaseId', data.judicialFileCaseId, { shouldValidate: true })
        } else {
          reset()
        }
      },
      enabled: false,
    }
  )

  const onAddBinnacle = () => {
    createJudicialBinnacle()
  }

  const onEditBinnacle = () => {
    editJudicialBinnacle()
  }

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  useEffect(() => {
    if (!!idBinnacle) {
      refetchGetJudicialBinnacleById()
    }
  }, [idBinnacle, refetchGetJudicialBinnacleById])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-binnacle"
        title={isEdit ? 'Editar Bitacora' : 'Agregar Bitacora'}
        contentOverflowY="auto"
        size="small"
        minHeight="430px"
        footer={
          <Container width="100%" height="75px" display="flex" justifyContent="end" alignItems="center" gap="20px">
            <Button
              width="125px"
              label={isEdit ? 'Editar' : 'Agregar'}
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={isEdit ? onEditBinnacle : onAddBinnacle}
              loading={loadingCreateJudicialBinnacle || loadingEditJudicialBinnacle}
              disabled={!isValid}
            />
          </Container>
        }
      >
        <Container
          width="100%"
          height="430px"
          display="flex"
          justify-content="center"
          flexDirection="column"
          align-items="center"
          gap="20px"
        >
          <Container width="100%" display="flex" flexDirection="column" gap="10px" padding="20px">
            <JudicialBinnacleInfoForm />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default JudicialBinnacleModal
