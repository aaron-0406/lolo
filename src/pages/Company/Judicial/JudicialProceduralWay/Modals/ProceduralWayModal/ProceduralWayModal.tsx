import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { FormProvider, useForm } from 'react-hook-form'
import {
  createProceduralWay,
  updateProceduralWay,
  getAllProceduralWayById,
} from '@/services/judicial/judicial-procedural-way.service'
import { ModalProceduralWayResolver } from './ProceduralWayModal.yup'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import notification from '@/ui/notification'
import ProceduralWayInfoForm from './ProceduralWayInfoForm'
import { AxiosError } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import { useLoloContext } from '@/contexts/LoloProvider'
import { JudicialProceduralWayType } from '@/types/judicial/judicial-procedural-way.type'
import extProceduralWayCache from '../../ProceduralWayTable/utils/ext-procedural-way.cache'

type ProceduralWayModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idProceduralWay?: number
}

const defaultValuesProceduralWay: Omit<JudicialProceduralWayType, 'createdAt'> = {
  id: 0,
  proceduralWay: '',
  customerHasBankId: 0,
}

const ProceduralWayModal = ({ visible, onClose, isEdit = false, idProceduralWay = 0 }: ProceduralWayModalProps) => {
  const {
    bank: {
      selectedBank: { idCHB: chb },
    },
  } = useLoloContext()

  const queryClient = useQueryClient()

  const {
    actions: { createProceduralWayCache, editProceduralWayCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = extProceduralWayCache(queryClient)

  const formMethods = useForm<JudicialProceduralWayType>({
    resolver: ModalProceduralWayResolver,
    mode: 'all',
    defaultValues: defaultValuesProceduralWay,
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateProceduralWay, mutate: mutateCreateProceduralWay } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, ...restProceduralWay } = getValues()
      return await createProceduralWay({ ...restProceduralWay, customerHasBankId: parseInt(chb) })
    },
    {
      onSuccess: (result) => {
        createProceduralWayCache(result.data)
        notification({ type: 'success', message: 'Via Procedimental creada' })
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

  const { isLoading: loadingEditProceduralWay, mutate: mutateEditProceduralWay } = useMutation<
    any,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { id, customerHasBankId, ...restProceduralWay } = getValues()
      return await updateProceduralWay(id, { ...restProceduralWay })
    },
    {
      onSuccess: (result) => {
        editProceduralWayCache(result.data)
        notification({ type: 'success', message: 'Via Procedimental editada' })
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

  const { refetch: refetchProceduralWays } = useQuery(
    'get-all-courts-by-id',
    async () => {
      return getAllProceduralWayById(idProceduralWay)
    },
    {
      onSuccess: ({ data }) => {
        if (idProceduralWay !== 0) {
          setValue('proceduralWay', data.proceduralWay)
          setValue('customerHasBankId', data.customerHasBankId)
          setValue('id', data.id)
        } else {
          reset(defaultValuesProceduralWay)
        }
      },
      enabled: false,
    }
  )

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  const onAddProceduralWay = () => {
    mutateCreateProceduralWay()
  }

  const onEditProceduralWay = () => {
    mutateEditProceduralWay()
  }

  useEffect(() => {
    if (!!idProceduralWay) {
      refetchProceduralWays()
    }
  }, [idProceduralWay, refetchProceduralWays])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-courts"
        title={isEdit ? 'Editar Via Procedimental' : 'Agregar Via Procedimental'}
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
              onClick={isEdit ? onEditProceduralWay : onAddProceduralWay}
              loading={loadingCreateProceduralWay || loadingEditProceduralWay}
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
            <ProceduralWayInfoForm />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default ProceduralWayModal
