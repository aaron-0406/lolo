import { useMutation, useQuery, useQueryClient } from 'react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { AxiosError, AxiosResponse } from 'axios'
import moment from 'moment'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import JudicialObservationInfoForm from './ObservationInfoForm'
import { ModalJudicialObservationResolver } from './ObservationModal.yup'
import { JudicialObservationType } from '@/types/judicial/judicial-observation.type'
import { useLoloContext } from '@/contexts/LoloProvider'
import { useEffect } from 'react'
import notification from '@/ui/notification'
import { CustomErrorResponse } from 'types/customErrorResponse'
import {
  createObservation,
  getObservationById,
  updateObservation,
} from '@/services/judicial/judicial-observation.service'
import JudicialObservationInfoFileForm from './ObservationInfoFileForm'
import { JudicialObsFileType } from '@/types/judicial/judicial-obs-file.type'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { device } from '@/breakpoints/responsive'
import judicialObservationCache from '../../FileCaseObservationTable/utils/judicial-observation.cache'

type ObservationModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idObservation?: number
  judicialFileCaseId?: number
  clientCode: string
}

const JudicialObservationModal = ({
  visible,
  onClose,
  isEdit = false,
  idObservation = 0,
  judicialFileCaseId = 0,
  clientCode,
}: ObservationModalProps) => {
  const queryClient = useQueryClient()
  const {
    actions: { createJudicialObservationCache, editJudicialObservationCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialObservationCache(queryClient)

  const {
    bank: {
      selectedBank: { idCHB },
    },
    client: {
      customer: { id: customerId },
    },
  } = useLoloContext()

  const formMethods = useForm<
    Omit<JudicialObservationType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> & {
      judicialObsFiles: JudicialObsFileType[]
      filesDnD: File[]
    }
  >({
    resolver: ModalJudicialObservationResolver,
    mode: 'all',
    defaultValues: {
      date: moment(new Date()).format('DD-MM-YYYY'),
      comment: '',
      judicialCaseFileId: Number(judicialFileCaseId),
      judicialObsTypeId: 0,
      customerHasBankId: Number(idCHB),
      judicialObsFiles: [],
      filesDnD: [],
    },
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateJudicialObservation, mutate: createJudicialObservation } = useMutation<
    AxiosResponse<JudicialObservationType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { ...restClient } = getValues()
      return await createObservation({ ...restClient, files: formMethods.watch('filesDnD') }, customerId, clientCode)
    },
    {
      onSuccess: (result) => {
        createJudicialObservationCache(result.data)
        notification({ type: 'success', message: 'Observación creada' })
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

  const { isLoading: loadingEditJudicialObservation, mutate: editJudicialObservation } = useMutation<
    AxiosResponse<JudicialObservationType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { customerHasBankId, judicialCaseFileId, ...restClient } = getValues()
      return await updateObservation(
        idObservation,
        { ...restClient, files: formMethods.watch('filesDnD') },
        customerId,
        clientCode
      )
    },
    {
      onSuccess: (result) => {
        editJudicialObservationCache(result.data)
        setValue('filesDnD', [])
        notification({ type: 'success', message: 'Observación editada' })
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

  const { refetch: refetchGetJudicialObservationById } = useQuery<
    AxiosResponse<
      JudicialObservationType & {
        judicialObsFile: JudicialObsFileType[]
      }
    >,
    AxiosError<CustomErrorResponse>
  >(
    [`GET_OBSERVATION_BY_ID`],
    async () => {
      return getObservationById(idObservation)
    },
    {
      onSuccess: ({ data }) => {
        if (!!idObservation) {
          setValue('date', moment(data.date.split('T')[0]).format('DD-MM-YYYY'), { shouldValidate: true })
          setValue('comment', data.comment, { shouldValidate: true })
          setValue('judicialCaseFileId', data.judicialCaseFileId, { shouldValidate: true })
          setValue('judicialObsTypeId', data.judicialObsTypeId, { shouldValidate: true })
          setValue('customerHasBankId', data?.customerHasBankId, { shouldValidate: true })
          setValue('judicialObsFiles', data.judicialObsFile, { shouldValidate: true })
        } else {
          reset()
        }
      },
      enabled: false,
    }
  )

  const onAddObservation = () => {
    createJudicialObservation()
  }

  const onEditObservation = () => {
    editJudicialObservation()
  }

  const handleClickCloseModal = () => {
    reset()
    onClose()
    setValue('filesDnD', [])
  }

  useEffect(() => {
    if (!!idObservation) {
      refetchGetJudicialObservationById()
    }
  }, [idObservation, refetchGetJudicialObservationById])

  const greaterThanMobile = useMediaQuery(device.desktopL)

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-observation"
        title={isEdit ? 'Editar Observation' : 'Agregar Observation'}
        contentOverflowY="auto"
        size="large"
        minHeight="430px"
        footer={
          <Container width="100%" height="75px" display="flex" justifyContent="end" alignItems="center" gap="20px">
            <Button
              width="125px"
              label={isEdit ? 'Editar' : 'Agregar'}
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={isEdit ? onEditObservation : onAddObservation}
              loading={loadingCreateJudicialObservation || loadingEditJudicialObservation}
              disabled={!isValid}
            />
          </Container>
        }
      >
        <Container
          width="100%"
          height="100%"
          display="flex"
          justify-content="center"
          flexDirection="column"
          align-items="center"
          gap="20px"
        >
          <Container
            width="100%"
            height="100%"
            flexWrap="nowrap"
            display="flex"
            flexDirection="column"
            padding="10px 20px"
          >
            <Container
              width="100%"
              height="100%"
              flexWrap="nowrap"
              display="flex"
              flexDirection={!greaterThanMobile ? 'column' : 'row'}
              gap="10px"
            >
              <Container
                width={!greaterThanMobile ? '100%' : '50%'}
                display="flex"
                flexDirection="column"
                gap="10px"
                padding="20px 20px 0 20px"
                overFlowY={!greaterThanMobile ? undefined : 'auto'}
              >
                <JudicialObservationInfoForm />
              </Container>

              <Container
                width={!greaterThanMobile ? '100%' : '50%'}
                display="flex"
                flexDirection="column"
                gap="10px"
                padding="20px 20px 0 20px"
                overFlowY={!greaterThanMobile ? undefined : 'auto'}
              >
                <JudicialObservationInfoFileForm judicialFileCaseId={judicialFileCaseId} clientCode={clientCode} />
              </Container>
            </Container>
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default JudicialObservationModal
