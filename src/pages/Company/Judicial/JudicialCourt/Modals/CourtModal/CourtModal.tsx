import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { createCourt, updateCourt, getAllCourtById } from '@/services/judicial/judicial-court.service'
import { ModalCourtResolver } from './CourtModal.yup'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import notification from '@/ui/notification'
import CourtInfoForm from './CourtInfoForm'
import { AxiosError } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'
import judicialCourtCache from '../../CourtTable/utils/judicial-court.cache'
import { JudicialCourtType } from '@/types/judicial/judicial-court.type'

type CourtModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idCourt?: number
}

const defaultValuesCourt: Omit<JudicialCourtType, 'createdAt'> = {
  id: 0,
  court: '',
  customerHasBankId: 0,
}

const CourtModal = ({ visible, onClose, isEdit = false, idCourt = 0 }: CourtModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const queryClient = useQueryClient()

  const {
    actions: { createCourtCache, editCourtCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = judicialCourtCache(queryClient)

  const formMethods = useForm<JudicialCourtType>({
    resolver: ModalCourtResolver,
    mode: 'all',
    defaultValues: defaultValuesCourt,
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateCourt, mutate: mutateCreateCourt } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restCourt } = getValues()
      return await createCourt({ ...restCourt, customerHasBankId: parseInt(chb) })
    },
    {
      onSuccess: (result) => {
        createCourtCache(result.data)
        notification({ type: 'success', message: 'Juzgado creado' })
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

  const { isLoading: loadingEditCourt, mutate: mutateEditCourt } = useMutation<any, AxiosError<CustomErrorResponse>>(
    async () => {
      const { id, customerHasBankId, ...restCourt } = getValues()
      return await updateCourt(id, { ...restCourt })
    },
    {
      onSuccess: (result) => {
        editCourtCache(result.data)
        notification({ type: 'success', message: 'Juzgado editado' })
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

  const { refetch: refetchCourts } = useQuery(
    'get-all-courts-by-id',
    async () => {
      return getAllCourtById(idCourt)
    },
    {
      onSuccess: ({ data }) => {
        if (idCourt !== 0) {
          setValue('court', data.court)
          setValue('customerHasBankId', data.customerHasBankId)
          setValue('cityId', data.cityId ?? undefined)
          setValue('id', data.id)
        } else {
          reset(defaultValuesCourt)
        }
      },
      enabled: false,
    }
  )

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  const onAddCourt = () => {
    mutateCreateCourt()
  }

  const onEditCourt = () => {
    mutateEditCourt()
  }

  useEffect(() => {
    if (!!idCourt) {
      refetchCourts()
    }
  }, [idCourt, refetchCourts])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-courts"
        title={isEdit ? 'Editar Juzgado' : 'Agregar Juzgado'}
        contentOverflowY="auto"
        size="small"
        minHeight="200px"
        footer={
          <Container width="100%" height="75px" display="flex" justifyContent="center" alignItems="center" gap="20px">
            <Button
              width="125px"
              label={isEdit ? 'Editar' : 'Agregar'}
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={isEdit ? onEditCourt : onAddCourt}
              loading={loadingCreateCourt || loadingEditCourt}
              disabled={!isValid}
            />
          </Container>
        }
      >
        <Container
          width="100%"
          height="200px"
          display="flex"
          justify-content="center"
          flexDirection="column"
          align-items="center"
          gap="20px"
        >
          <Container width="100%" display="flex" flexDirection="column" gap="20px" padding="20px">
            <CourtInfoForm />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default CourtModal
