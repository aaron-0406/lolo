import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import { FormProvider, useForm } from 'react-hook-form'
import JudicialBinTypeBinnacleInfoForm from './JudicialBinTypeBinnacleInfoForm'
import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import notification from '@/ui/notification'
import {
  createJudicialBinTypeBinnacle,
  getJudicialBinTypeBinnacleById,
  updateJudicialBinTypeBinnacle,
} from '@/services/judicial/judicial-bin-type-binnacle.service'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { AxiosError } from 'axios'
import { JudicialBinTypeBinnacleType } from '@/types/judicial/judicial-bin-type-binnacle.type'
import { useLoloContext } from '@/contexts/LoloProvider'
import { ModalJudicialBinTypeBinnacleResolver } from './JudicialBinTypeBinnacleModal.yup'
import extBinTypeBinnaclesCache from '../../JudicialBinTypeBinnacleTable/utils/judicial-bin-type-binnacle.cache'

type JudicialBinTypeBinnacleModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idBinTypeBinnacle?: number
}

const defaultValuesBinTypeBinnacle: Omit<JudicialBinTypeBinnacleType, 'createdAt' | 'updatedAt' | 'deletedAt'> = {
  id: 0,
  typeBinnacle: '',
  customerHasBankId: 0,
}

const JudicialBinTypeBinnacleModal = ({
  onClose,
  visible,
  idBinTypeBinnacle,
  isEdit,
}: JudicialBinTypeBinnacleModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()
  const queryClient = useQueryClient()

  const {
    actions: { createBinTypeBinnacleCache, editBinTypeBinnacleCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = extBinTypeBinnaclesCache(queryClient)

  const formMethods = useForm<JudicialBinTypeBinnacleType>({
    resolver: ModalJudicialBinTypeBinnacleResolver,
    mode: 'all',
    defaultValues: defaultValuesBinTypeBinnacle,
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateNegotiation, mutate: mutateCreateNegotiation } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restBinTypeBinnacle } = getValues()
      return await createJudicialBinTypeBinnacle({ ...restBinTypeBinnacle, customerHasBankId: parseInt(chb) })
    },
    {
      onSuccess: (result) => {
        createBinTypeBinnacleCache(result.data)
        notification({ type: 'success', message: 'Tipo de Bitacora creada' })
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

  const { isLoading: loadingEditNegotiation, mutate: mutateEditNegotiation } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, customerHasBankId, ...restBinTypeBinnacle } = getValues()
      return await updateJudicialBinTypeBinnacle(id, { ...restBinTypeBinnacle })
    },
    {
      onSuccess: (result) => {
        editBinTypeBinnacleCache(result.data)
        notification({ type: 'success', message: 'Tipo de Bitacora editada' })
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

  const { refetch: refetchNegotiations } = useQuery(
    'get-all-bin-type-binnacle-by-id',
    async () => {
      return getJudicialBinTypeBinnacleById(Number(idBinTypeBinnacle))
    },
    {
      onSuccess: ({ data }) => {
        if (idBinTypeBinnacle !== 0) {
          setValue('typeBinnacle', data.typeBinnacle)
          setValue('customerHasBankId', data.customerHasBankId)
          setValue('id', data.id)
        } else {
          reset(defaultValuesBinTypeBinnacle)
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
    if (!!idBinTypeBinnacle) {
      refetchNegotiations()
    }
  }, [idBinTypeBinnacle, refetchNegotiations])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-negociaciones"
        title={isEdit ? 'Editar Tipo de Bitacora' : 'Agregar Tipo de Bitacora'}
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
            <JudicialBinTypeBinnacleInfoForm />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default JudicialBinTypeBinnacleModal
