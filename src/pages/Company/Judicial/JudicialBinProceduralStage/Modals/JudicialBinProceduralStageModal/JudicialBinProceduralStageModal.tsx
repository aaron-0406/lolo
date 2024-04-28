import { useLoloContext } from '@/contexts/LoloProvider'
import { JudicialBinProceduralStageType } from '@/types/judicial/judicial-bin-procedural-stage.type'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import extBinProceduralStagesCache from '../../JudicialBinProceduralStageTable/utils/judicial-bin-procedural-stage.cache'
import { FormProvider, useForm } from 'react-hook-form'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { AxiosError } from 'axios'
import notification from '@/ui/notification'
import {
  createJudicialBinProceduralStage,
  getJudicialBinProceduralStageById,
  updateJudicialBinProceduralStage,
} from '@/services/judicial/judicial-bin-procedural-stage.service'
import { useEffect } from 'react'
import Modal from '@/ui/Modal'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import JudicialBinProceduralStageInfoForm from './JudicialBinProceduralStageInfoForm'
import { ModalJudicialBinProceduralStageResolver } from './JudicialBinProceduralStageModal.yup'

type JudicialBinProceduralStageModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idBinProceduralStage?: number
}

const defaultValuesBinProceduralStage: Omit<JudicialBinProceduralStageType, 'createdAt' | 'updatedAt' | 'deletedAt'> = {
  id: 0,
  proceduralStage: '',
  customerHasBankId: 0,
}

const JudicialBinProceduralStageModal = ({
  onClose,
  visible,
  idBinProceduralStage,
  isEdit,
}: JudicialBinProceduralStageModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()
  const queryClient = useQueryClient()

  const {
    actions: { createBinProceduralStageCache, editBinProceduralStageCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = extBinProceduralStagesCache(queryClient)

  const formMethods = useForm<JudicialBinProceduralStageType>({
    resolver: ModalJudicialBinProceduralStageResolver,
    mode: 'all',
    defaultValues: defaultValuesBinProceduralStage,
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
      const { id, ...restBinProceduralStage } = getValues()
      return await createJudicialBinProceduralStage({ ...restBinProceduralStage, customerHasBankId: parseInt(chb) })
    },
    {
      onSuccess: (result) => {
        createBinProceduralStageCache(result.data)
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

  const { isLoading: loadingEditNegotiation, mutate: mutateEditNegotiation } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, customerHasBankId, ...restBinProceduralStage } = getValues()
      return await updateJudicialBinProceduralStage(id, { ...restBinProceduralStage })
    },
    {
      onSuccess: (result) => {
        editBinProceduralStageCache(result.data)
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

  const { refetch: refetchNegotiations } = useQuery(
    'get-all-bin-procedutal-stage-by-id',
    async () => {
      return getJudicialBinProceduralStageById(Number(idBinProceduralStage))
    },
    {
      onSuccess: ({ data }) => {
        if (idBinProceduralStage !== 0) {
          setValue('proceduralStage', data.proceduralStage)
          setValue('customerHasBankId', data.customerHasBankId)
          setValue('id', data.id)
        } else {
          reset(defaultValuesBinProceduralStage)
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
    if (!!idBinProceduralStage) {
      refetchNegotiations()
    }
  }, [idBinProceduralStage, refetchNegotiations])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-negociaciones"
        title={isEdit ? 'Editar Etapa Procedimental' : 'Agregar Etapa Procedimental'}
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
            <JudicialBinProceduralStageInfoForm />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default JudicialBinProceduralStageModal
