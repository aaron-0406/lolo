import { useEffect } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { ModalIpAddressBankResolver } from './ipAddressBankModal.yup'
import { ExtIpAddressBankType } from '@/types/extrajudicial/ext-ip-address-bank.type'
import { createIpAddress, editIpAddress, getIpAddressById } from '@/services/extrajudicial/ext-ip-address-bank.service'
import Container from '@/ui/Container'
import Modal from '@/ui/Modal'
import notification from '@/ui/notification'
import Button from '@/ui/Button'
import { CustomErrorResponse } from 'types/customErrorResponse'
import IpAddressInfoForm from './IpAddressInfoForm'
import ipAddressBankCache, {
  KEY_EXT_IP_ADDRESS_BANK_CACHE,
} from '../../IpAddressBankTable/utils/dash-ip-address-bank.cache'
import { useLoloContext } from '@/contexts/LoloProvider'

type IpAddressModalProps = {
  visible: boolean
  onClose: () => void
  isEdit?: boolean
  idIpAddress?: number
}

const IpAddressBankModal = ({ visible, onClose, idIpAddress = 0, isEdit = false }: IpAddressModalProps) => {
  const queryClient = useQueryClient()
  const {
    actions: { createIpAddressBankCache, editIpAddressBankCache },
    onMutateCache,
    onSettledCache,
    onErrorCache,
  } = ipAddressBankCache(queryClient)

  const {
    client: { customer },
  } = useLoloContext()

  const formMethods = useForm<Omit<ExtIpAddressBankType, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>({
    resolver: ModalIpAddressBankResolver,
    mode: 'all',
    defaultValues: {
      addressName: '',
      ip: '',
      state: true,
      customerId: customer.id,
    },
  })

  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = formMethods

  const { isLoading: loadingCreateIpAddress, mutate: createIpAddressBank } = useMutation<
    AxiosResponse<ExtIpAddressBankType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const ipAddress = getValues()
      return await createIpAddress(ipAddress)
    },
    {
      onSuccess: (result) => {
        createIpAddressBankCache(result.data)
        notification({ type: 'success', message: 'Dirección IP Creada' })
        handleClickCloseModal()
      },
      onMutate: () => {
        return onMutateCache()
      },
      onSettled: () => {
        onSettledCache()
      },
      onError: (error, _, context: any) => {
        onErrorCache(context)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { isLoading: loadingEditIpAddress, mutate: editIpAddressBank } = useMutation<
    AxiosResponse<ExtIpAddressBankType>,
    AxiosError<CustomErrorResponse>
  >(
    async () => {
      const ipAddress = getValues()
      return await editIpAddress(ipAddress, idIpAddress)
    },
    {
      onSuccess: (result) => {
        editIpAddressBankCache(result.data)
        notification({ type: 'success', message: 'Dirección IP Editada' })
        onClose()
      },
      onMutate: () => {
        return onMutateCache()
      },
      onSettled: () => {
        onSettledCache()
      },
      onError: (error, _, context: any) => {
        onErrorCache(context)
        notification({
          type: 'error',
          message: error.response?.data.message,
          list: error.response?.data?.errors?.map((error) => error.message),
        })
      },
    }
  )

  const { refetch: refetchGetIpAddressById } = useQuery<AxiosResponse<ExtIpAddressBankType>>(
    [`${KEY_EXT_IP_ADDRESS_BANK_CACHE}_GET_IP_ADDRESS_BY_ID`],
    async () => {
      return getIpAddressById(idIpAddress, customer.id)
    },
    {
      onSuccess: ({ data }) => {
        if (!!idIpAddress) {
          setValue('addressName', data.addressName, { shouldValidate: true })
          setValue('state', !!data.state, { shouldValidate: true })
          setValue('ip', data.ip, { shouldValidate: true })
          setValue('customerId', data.customerId, { shouldValidate: true })
        } else {
          reset()
        }
      },
      enabled: false,
    }
  )

  const onEditIpAddress = () => {
    editIpAddressBank()
  }

  const onAddIpAddress = () => {
    createIpAddressBank()
  }

  const handleClickCloseModal = () => {
    reset()
    onClose()
  }

  useEffect(() => {
    if (!!idIpAddress) {
      refetchGetIpAddressById()
    }
  }, [idIpAddress, refetchGetIpAddressById])

  return (
    <FormProvider {...formMethods}>
      <Modal
        size="small"
        visible={visible}
        onClose={handleClickCloseModal}
        id="modal-files"
        title={isEdit ? 'Editar dirección IP' : 'Agregar dirección IP'}
        contentOverflowY="auto"
        minHeight="210px"
        footer={
          <Container width="100%" height="75px" display="flex" justifyContent="flex-end" alignItems="center" gap="20px">
            <Button
              width="125px"
              label={isEdit ? 'Editar' : 'Agregar'}
              shape="default"
              trailingIcon="ri-add-fill"
              onClick={isEdit ? onEditIpAddress : onAddIpAddress}
              loading={loadingCreateIpAddress || loadingEditIpAddress}
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
            <IpAddressInfoForm />
          </Container>
        </Container>
      </Modal>
    </FormProvider>
  )
}

export default IpAddressBankModal
