import { useMutation, useQuery, useQueryClient } from 'react-query'
import companyAddressesCache, {
  KEY_COBRANZA_URL_ADDRESSES_CODE_CACHE,
} from '../../CobranzaAddressesTable/utils/company-addresses.cache'
import { FormProvider, useForm } from 'react-hook-form'
import { DirectionType } from '@/types/extrajudicial/direction.type'
import { ModalCobranzaAddressesResolver } from './CobranzaAddressesModal.yup'
import { AxiosError, AxiosResponse } from 'axios'
import { CustomErrorResponse } from 'types/customErrorResponse'
import notification from '@/ui/notification'
import { createDirection, editDirection, getDirectionByID } from '@/services/extrajudicial/direction.service'
import { useEffect } from 'react'
import Modal from '@/ui/Modal'
import Container from '@/ui/Container'
import Button from '@/ui/Button'
import CobranzaAddressesInfoForm from './CobranzaAddressesInfoForm'

type CobranzaAddressesModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idAddress?: number
  clientId?: number
}

const CobranzaAddressesModal = ({
  visible,
  onClose,
  isEdit = false,
  idAddress = 0,
  clientId = 0,
}: CobranzaAddressesModalProps) => {
  const queryClient = useQueryClient()
  const {
    actions: { createCobranzaAddressCache, editCobranzaAddressCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = companyAddressesCache(queryClient)

  const formMethods = useForm<
    Omit<DirectionType, 'id' | 'createdAt'> & { addressType: { type: string; customerHasBankId: string } }
  >({
    resolver: ModalCobranzaAddressesResolver,
    mode: 'all',
    defaultValues: {
      direction: '',
      addressTypeId: 0,
      clientId,
    },
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateCobranzaAddress, mutate: createCobranzaAddress } = useMutation<
    AxiosResponse<DirectionType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { addressType, ...restClient } = getValues()
      return await createDirection({ ...restClient })
    },
    {
      onSuccess: (result) => {
        createCobranzaAddressCache(result.data)
        notification({ type: 'success', message: 'Dirección creada' })
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateCache(clientId)
      },
      onSettled: () => {
        onSettledCache(clientId)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, clientId)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { isLoading: loadingEditCobranzaAddress, mutate: editCobranzaAddress } = useMutation<
    AxiosResponse<DirectionType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const { clientId, addressType, ...restClient } = getValues()
      return await editDirection({ ...restClient }, idAddress)
    },
    {
      onSuccess: (result) => {
        editCobranzaAddressCache(result.data)
        notification({ type: 'success', message: 'Dirección editada' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache(clientId)
      },
      onSettled: () => {
        onSettledCache(clientId)
      },
      onError: (error, _, context: any) => {
        onErrorCache(context, clientId)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { refetch: refetchGetCobranzaAddressById } = useQuery(
    [`${KEY_COBRANZA_URL_ADDRESSES_CODE_CACHE}_GET_ADDRESS_BY_ID`],
    async () => {
      return getDirectionByID(idAddress)
    },
    {
      onSuccess: ({ data }) => {
        if (!!idAddress) {
          setValue('direction', data.direction, { shouldValidate: true })
          setValue('addressType', data?.addressType, { shouldValidate: true })
          setValue('addressTypeId', data.addressTypeId, { shouldValidate: true })
          setValue('clientId', data.clientId, { shouldValidate: true })
        } else {
          reset()
        }
      },
      enabled: false,
    }
  )

  const onAddAddress = () => {
    createCobranzaAddress()
  }

  const onEditAddress = () => {
    editCobranzaAddress()
  }

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  useEffect(() => {
    if (!!idAddress) {
      refetchGetCobranzaAddressById()
    }
  }, [idAddress, refetchGetCobranzaAddressById])

  return (
    <FormProvider {...formMethods}>
      <Modal
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-files"
        title={isEdit ? 'Editar Dirección' : 'Agregar Dirección'}
        contentOverflowY="auto"
        size="small"
        minHeight="210px"
        footer={
          <Container width="100%" height="75px" display="flex" justifyContent="end" alignItems="center" gap="20px">
            <Button
              width="125px"
              label={isEdit ? 'Editar' : 'Agregar'}
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={isEdit ? onEditAddress : onAddAddress}
              loading={loadingCreateCobranzaAddress || loadingEditCobranzaAddress}
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
            <CobranzaAddressesInfoForm clientId={clientId} />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default CobranzaAddressesModal
